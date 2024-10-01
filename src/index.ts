import { Hono } from "hono";
import stock from "./stock";
import trade from "./trade";

const app = new Hono().basePath('/api');

app.route("stocks", stock);
app.route("trade", trade);

export default app;
