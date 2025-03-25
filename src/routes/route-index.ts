import { Hono } from "hono";
import { authentictaionRoutes } from "./authentictaion-routes";
import { userRoutes } from "./user-routes";

export const allroutes = new Hono();

allroutes.use(async (c, next) => {
  console.log("http method",c.req.method);
  console.log("url",c.req.url);
  await next();
});
allroutes.route("/authentication", authentictaionRoutes)

allroutes.route("/users", userRoutes)

allroutes.get("/health", (c,next) => {
  console.log("http method",c.req.method);
  console.log("url",c.req.url);
  const authentication=c.req.header("authorization")
 next();
    },
    (c) => {
      return c.json(
        {
          status: "ok",
        },
);
}
  );
