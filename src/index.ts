import "dotenv/config";
import { hono } from "./routes";
import { serve } from "@hono/node-server";


console.log(`Server started at http://localhost:${3000}`);
serve(hono);