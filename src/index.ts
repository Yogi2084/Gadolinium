import "dotenv/config";
import { allroutes } from "./routes/route-index";
import { serve } from "@hono/node-server";

// allroutes.get("/", (c) => {
    
// })
console.log(`Server started at http://localhost:${3000}`);
serve(allroutes);
