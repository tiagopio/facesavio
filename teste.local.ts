import { PrismaClient, User } from "@prisma/client";

const db = new PrismaClient();

(async () => {
    const user = await db.follow.findMany({
        include: {
            following: true,
            user: true
        }
    })

    console.log(user[0].user, user[0].following)
    const { clerkId } = await db.user.findFirstOrThrow({
        where: {
            id: "123"
        }
    })
})();
