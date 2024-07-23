import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export { db }
export * from "./server"
export * from "./actions"