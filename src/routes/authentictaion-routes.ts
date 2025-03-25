import { Hono } from "hono";
import { loginWithUserNameAndPAsswordResult, signUpWithUsernameAndPasswordResponseResult } from "../controllers/authentication/authentication-controller";
import { SignInWithUsernameAndPasswordError, SignupError } from "../controllers/authentication/authentication-type";
export const authentictaionRoutes = new Hono();
authentictaionRoutes.post("/sign-up", async (c) => {
    const { username, password } = await c.req.json();
    try {
      const result = await signUpWithUsernameAndPasswordResponseResult({
        username,
        password,
      });
  
      return c.json({ data: result }, 200);
    } catch (error) {
      if (error === SignupError.CONFLICTING_USERNAME) {
        return c.json({ error: "Username already exists" }, 409);
      }
  
      if (error === SignupError.UNKNOWN) {
        return c.json({ error: "Unknown error" }, 500);
      }
    }
  });
  
authentictaionRoutes.post("/sign-in", async (c) => {
    const { username, password } = await c.req.json();
    try {
      const result = await loginWithUserNameAndPAsswordResult({
        username,
        password,
      });
  
      return c.json({ data: result }, 200);
    } catch (error) {
      if (error === SignInWithUsernameAndPasswordError.INVALID_CREDENTIALS) {
        return c.json({ error: "Invalid credentials" }, 401);
      }
  
      if (error === SignInWithUsernameAndPasswordError.UNKNOWN) {
        return c.json({ error: "Unknown error" }, 500);
      }
    }
  });
