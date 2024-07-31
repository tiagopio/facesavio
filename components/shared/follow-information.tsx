import { UserRepository } from "@/repository/user";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { ComponentProps } from "react";

type Props = {
    following: Set<string>;
    followedBy: Set<string>;
} & ComponentProps<"div">;

export function FollowInformation({
    following,
    followedBy,
    ...props
}: Props) {
    

    return (
        <div {...props}>
            <div>
                <span className="text-main-primary font-bold">
                    {followedBy.size}
                </span>{" "}
                seguidores
            </div>
            <div>
                <span className="text-main-primary font-bold">
                    {following.size}
                </span>{" "}
                seguindo
            </div>
        </div>
    )
}