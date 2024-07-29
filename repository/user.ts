import "server-only"

import { db } from "@/lib/db";
import { RequireAtLeastOne } from "@/types/util";
import { Post, User } from "@prisma/client";
import { unstable_cache } from "next/cache";

type UserProps = RequireAtLeastOne<{ username: string, clerkId: string, id: string }>
type Identifier = { value: string, tag: keyof UserProps }

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
    public getUsers = async (ids: Set<string> | Array<string>): Promise<Array<User>> => {
        return await db.user.findMany({
            where: {
                id: {
                    in: Array.from(ids)
                }
            }
        });
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
    public getFollowers = async (): Promise<Set<string>> => {
        let userId = this.identifier.value;
        if (this.identifier.tag !== "id")
            userId = await this.getId();

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
    public getFollowing = async (): Promise<Set<string>> => {
        let userId = this.identifier.value;
        if (this.identifier.tag !== "id")
            userId = await this.getId();

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
    public getUserPosts = async (): Promise<Array<Post>> => {
        let userId = this.identifier.value;
        if (this.identifier.tag !== "id")
            userId = await this.getId();

        return await db.post.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" }
        });
    }

    /**
     * Query users based on a search query
     * This function is cached for 60 seconds.
     * @returns Array<User>
     */
    public static queryUsers = ({ max = 10, query }: { max?: number, query: string }) => unstable_cache(
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
        [`query-users-${query}`],
        { revalidate: 60 } // 60 seconds
    )({ max, query });

    /**
     * Returns an array of suggested posts
     * @returns Array<Post>
    */
    public getSuggestedPosts = async (): Promise<Array<Post & { user: User }>> => {
        return await db.post.findMany({
            include: {
                user: true
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
        const following = await this.getFollowing();
        const followers = await this.getFollowers();
        const userId = await this.getId();

        // Followers that the user is not following
        const unfollowed = new Set<string>();
        followers.forEach(f => {
            if (!following.has(f) && f !== userId)
                unfollowed.add(f);
        })

        // Friends of friends
        const friendsOfFriendsQuery = await db.follow.findMany({
            where: {
                userId: { in: Array.from(following) }
            }
        });
        const friendsOfFriends = new Set<string>();
        friendsOfFriendsQuery.forEach(f => {
            if (f.followingId !== userId || !following.has(f.userId))
                friendsOfFriends.add(f.followingId);
        });

        const target = await db.user.findMany({
            take: max,
            where: {
                OR: [
                    {
                        // Users that my friends are following
                        id: {
                            in: Array.from(friendsOfFriends)
                        }
                    },
                    {
                        // Users that are not following the user's followers
                        id: {
                            in: Array.from(unfollowed)
                        }
                    }
                ]
            }
        });

        if (target.length < max) {
            const remaining = max - target.length;
            const more = await db.user.findMany({
                take: remaining,
                where: {
                    NOT: {
                        id: {
                            in: [userId, ...target.map(t => t.id)]
                        }
                    }
                }
            });

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
        [`suggested-users-${this.identifier.value}`],
        { revalidate: 60 * 60 * 24 } // 24 hours
    );
}