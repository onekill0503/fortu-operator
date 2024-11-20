import { Elysia } from "elysia";
import scheduler from "./scheduler";

const app = new Elysia()
  .use(scheduler);

app.listen(process.env.PORT ?? 3000);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
