import { Hono } from "hono";
import { authentictaionRoutes } from "./authentictaion-routes";
export const allroutes = new Hono();

allroutes.route("/authentication", authentictaionRoutes)

allroutes.get("/health", (c) => {
  return c.json(
    {
      message: "All Ok",
    },
    200
  );
});
