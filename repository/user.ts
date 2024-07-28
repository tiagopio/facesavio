import { db } from "@/lib/db";
import { RequireAtLeastOne } from "@/types/util";
import { Post, User } from "@prisma/client";

type UserProps = RequireAtLeastOne<{ username: string, clerkId: string, id: string }>
type Identifier = { value: string, tag: keyof UserProps }

export class UserRepository {
    private identifier: Identifier = {} as Identifier;

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
        return await db.user.findFirstOrThrow({
            where: this.where()
        }).then(user => user.id);
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
     * Returns an array of posts that the user has made
     * @returns Array<Post>
     * @throws Error if user is not found
    */
    public getUserPosts = async (): Promise<Array<Post>> => {
        let userId = this.identifier.value;
        if (this.identifier.tag !== "id")
            userId = await this.getId();

        return await db.post.findMany({
            where: { userId }
        });
    }


}