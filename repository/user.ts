import "server-only"

import { db } from "@/lib/db";
import { RequireAtLeastOne } from "@/types/util";
import { Like, Post, User } from "@prisma/client";
import { unstable_cache } from "next/cache";

type UserProps = RequireAtLeastOne<{ username: string, clerkId: string, id: string }>
type QueryUser = RequireAtLeastOne<{ set: Set<string> | Array<string>, query: string }> & { max?: number }
type Identifier = { value: string, tag: keyof UserProps }

const cacheTime = 60; // 60 seconds
export class UserRepository {
    private identifier: Identifier = {} as Identifier;
    private userId: undefined | string;

    constructor({ username, clerkId, id }: UserProps) {
        if (id)
            this.identifier = { value: id, tag: "id" };
        else if (clerkId)
            this.identifier = { value: clerkId, tag: "clerkId" };
        else if (username)
            this.identifier = { value: username, tag: "username" };
        else
            // This should never happen
            throw new Error("Invalid identifier");
    }

    private where = () => {
        const where = {} as Record<string, string>;
        where[this.identifier.tag] = this.identifier.value;

        return where;
    }

    /**
     * Returns the database id of the user
     * @returns string
     * @throws Error if user is not found
     */
    private getId = async (): Promise<string> => {
        if (this.identifier.tag === "id")
            return this.identifier.value;

        let userId = this.userId

        // If the user id is not cached, fetch it from the database
        if (!userId) {
            const user = await db.user.findFirstOrThrow({
                where: this.where()
            })

            userId = user.id
            this.userId = userId
        }

        return userId
    }

    /**
     * Returns a user object or null if not found
     * @returns User
     */
    public getUser = async (): Promise<User | null> => {
        return await db.user.findFirst({
            where: this.where()
        });
    }

    /**
     * Returns an array of user objects
     * @returns Array<User>
     */
    public static getUsers = async ({ query, set, max = 10 }: QueryUser): Promise<Array<User>> => {
        if (query) {
            return await UserRepository.queryUsers({ query, max });
        }
        else if (set) {
            return await db.user.findMany({
                where: {
                    id: {
                        in: Array.from(set)
                    }
                }
            });
        }
        else
            throw new Error("Invalid query");
    }

    /**
     * Returns a user object
     * @returns User
     * @throws Error if user is not found
     */
    public getUserOrThrow = async (): Promise<User> => {
        return await db.user.findFirstOrThrow({
            where: this.where()
        });
    }

    /**
     * Returns a set of id's of users that the user is following
     * @returns Set<string>
    */
    public getFollowing = async (): Promise<Set<string>> => {
        const userId = await this.getId();
        const followers = await db.follow.findMany({
            where: { userId }
        });

        const followerSet = new Set<string>();
        followers.forEach(f => {
            followerSet.add(f.followingId);
        });

        return followerSet;
    }
    /**
     * Returns a set of id's of users that are following the user
     * @returns Set<string>
    */
    public getFollowedBy = async (): Promise<Set<string>> => {
        const userId = await this.getId();
        const following = await db.follow.findMany({
            where: { followingId: userId }
        });

        const followingSet = new Set<string>();
        following.forEach(f => {
            followingSet.add(f.userId);
        });

        return followingSet;
    }

    /**
     * Returns an array of posts that the user has made
     * @returns Array<Post>
     * @throws Error if user is not found
    */
    public getUserPosts = async (): Promise<Array<Post & { likes: Array<Like> }>> => {
        const userId = await this.getId();
        return await db.post.findMany({
            where: { userId },
            include: { likes: true },
            orderBy: { createdAt: "desc" }
        });
    }

    /**
     * Query users based on a search query
     * This function is cached for 60 seconds.
     * @returns Array<User>
     */
    private static queryUsers = ({ max = 10, query }: { max?: number, query: string }) => unstable_cache(
        async ({
            max = 10,
            query
        }: {
            max: number,
            query: string
        }): Promise<Array<User>> => {
            return await db.user.findMany({
                take: max,
                where: {
                    OR: [
                        { username: { contains: query, mode: "insensitive" } },
                        { name: { contains: query, mode: "insensitive" } }
                    ]
                }
            });
        },
        [`query-users-algorithm-${query}`],
        { revalidate: cacheTime }
    )({ max, query });

    /**
     * Returns an array of suggested posts
     * @returns Array<Post>
    */
    public getSuggestedPosts = async (): Promise<Array<Post & { user: User, likes: Array<Like> }>> => {
        return await db.post.findMany({
            include: {
                user: true,
                likes: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });
    }

    /**
     * Returns an array of suggested users to follow
     * @returns Array<User>
     * @throws Error if user is not found
    */
    private getSuggestedUsersAlgorithm = async ({
        max = 10
    }): Promise<Array<User>> => {
        console.log("Fetching suggested users")
        const following = await this.getFollowing(); // Users that the user is following
        const followedBy = await this.getFollowedBy(); // Users that are following the user
        const userId = await this.getId();

        console.log("Following", following, userId)
        console.log("FollowedBy", followedBy, userId)

        const isFollowing = (id: string) => following.has(id);

        // Followers that the user is not following
        const unfollowed = new Set<string>();
        followedBy.forEach(f => {
            if (!isFollowing(f))
                unfollowed.add(f);
        })

        console.log("Unfollowed", unfollowed, userId)

        // Friends of friends
        const friendsOfFriendsQuery = await db.follow.findMany({
            where: {
                userId: { in: Array.from(following) }
            }
        });

        // Map of relevance for each user (calculates how many friends in common for each user)
        const relevanceMap = new Map<string, number>();
        friendsOfFriendsQuery.forEach(f => {
            if (f.followingId !== userId) {
                const relevance = relevanceMap.get(f.followingId) || 0;
                relevanceMap.set(f.followingId, relevance + 1);
            }
        });

        console.log("Relevance map", relevanceMap, userId)

        const friendsOfFriends = new Set<string>();
        const sorted = Array.from(relevanceMap.entries()).sort((a, b) => b[1] - a[1]);
        sorted.forEach(f => {
            friendsOfFriends.add(f[0]);
        });

        console.log("Friends of friends", friendsOfFriends, userId)

        const target = await db.user.findMany({
            take: max,
            where: {
                // Users that my friends are following
                id: {
                    in: Array.from(friendsOfFriends)
                }
            }
        });

        if (target.length < max) {
            const remaining = max - target.length;
            const more = await db.user.findMany({
                take: remaining,
                where: {
                    id: {
                        in: Array.from(unfollowed)
                    }
                }
            });

            console.log("More", more, userId)

            target.push(...more);
        }


        return target;
    }

    /**
     * Returns an array of suggested users to follow.
     * This function is cached for 24 hours.
     * @returns Array<User>
     * @throws Error if user is not found
    */
    public getSuggestedUsers = unstable_cache(
        this.getSuggestedUsersAlgorithm,
        [`suggested-users-algorithm-${this.identifier.value}-userId`],
        { revalidate: cacheTime }
    );

    /**
     * Returns an array of likes that the user received on their posts in descending order
     * @returns Array<Like>
     * @throws Error if user is not
     */
    public getLikes = async ({ max = 10 }): Promise<Array<Like & { user: User, post: Post }>> => {
        const userPosts = await this.getUserPosts();

        const postIds = userPosts.map(p => p.id);
        return await db.like.findMany({
            take: max,
            where: {
                postId: {
                    in: postIds
                }
            },
            orderBy: {
                createdAt: "desc"
            },
            include: {
                user: true,
                post: true
            }
        });
    }

}