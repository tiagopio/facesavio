import { UserRepository } from "@/repository/user";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { ComponentProps } from "react";

type Props = {
    followers: Set<string>;
    following: Set<string>;
} & ComponentProps<"div">;

export function FollowInformation({
    followers,
    following,
    ...props
}: Props) {
    

    return (
        <div {...props}>
            <div>
                <span className="text-main-primary font-bold">
                    {following.size}
                </span>{" "}
                seguidores
            </div>
            <div>
                <span className="text-main-primary font-bold">
                    {followers.size}
                </span>{" "}
                seguindo
            </div>
        </div>
    )
}