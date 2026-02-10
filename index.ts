import express from "express";
import { PrismaClient, Prisma } from "./generated/prisma/client";
import {PrismaPg} from "@prisma/adapter-pg";
import 'dotenv/config'

const adapter = new PrismaPg({connectionString: process.env.DATABASE_URL})
const prisma = new PrismaClient({adapter})
const app = express();
app.use(express.json());

app.get("/users", async (_, res) => {
  const users = await prisma.user.findMany({
    where: {
      nationality: {
        in: ["Irish", "German", "Portuguese"],
      },
      isMarried: true,
    },
  });
  res.json(users);
});

app.put("/users", async (_, res) => {
  const updatedUser = await prisma.user.update({
    where: { email: "pedro@example.com" },
    data: {
      age: 35,
      isMarried: true,
    },
  });
  res.json(updatedUser);
});

app.delete("/users", async (_, res) => {
  const deletedUsers = await prisma.user.deleteMany({
    where: { age: { gt: 30 } },
  });
  res.json(deletedUsers);
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
app.get("/users", async (_, res) => {
  const users = await prisma.user.findMany({
    where: {
      nationality: {
        in: ["Irish", "German", "Portuguese"],
      },
      isMarried: true,
    },
  });
  res.json(users);
});