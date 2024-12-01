import { load } from "@std/dotenv";

await load({ export: true });

export const SESSION_COOKIE = Deno.env.get("SESSION_COOKIE");
