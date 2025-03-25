import jwt from "jsonwebtoken";
import { Hono } from "hono";
import { secret } from "../environment";
import { prisma } from "../extras/prisma";
export const userRoutes = new Hono();

userRoutes.get(
  "/",
  async (c, next) => {
    const token = c.req.header("token");

    if (!token) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    try {
      const verified = jwt.verify(token, secret);
    } catch (error) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    await next();
  },
  async (c) => {
    const users = await prisma.user.findMany();

    return c.json(users, 200);
  }
);
