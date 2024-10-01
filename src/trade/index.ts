import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { schema, tradeTable } from "../../drizzle/schema";
import { createTradeSchema } from "../../lib/validations/trade";

const trade = new Hono<{ Bindings: { DB: D1Database } }>();

trade
  .get("/", async (c) => {
    try {
      const db = drizzle(c.env.DB, { schema });
      const res = await db.query.tradeTable.findMany({
        with: { stock: true },
      });
      if (res.length === 0) {
        return c.json({ error: "登録データがありません" }, 404);
      }
      return c.json(res);
    } catch (e) {
      return c.json({ error: e }, 500);
    }
  })
  .post("/", zValidator("json", createTradeSchema), async (c) => {
    const trade = c.req.valid("json");
    try {
      const db = drizzle(c.env.DB);
      await db.insert(tradeTable).values(trade);
      return c.json({ message: "登録しました" }, 201);
    } catch (e) {
      return c.json({ error: "すでに登録されています" }, 500);
    }
  })
  .get(":id", async (c) => {
    try {
      const db = drizzle(c.env.DB, { schema });
      const id = parseInt(c.req.param("id"));
      const res = await db.query.tradeTable.findFirst({
        with: { stock: true },
        where: eq(tradeTable.id, id),
      });
      if (!res) {
        return c.json({ error: "登録データがありません" }, 404);
      }
      return c.json(res);
    } catch (e) {
      return c.json({ error: e }, 500);
    }
  })
  .put(":id", zValidator("json", createTradeSchema), async (c) => {
    try {
      const db = drizzle(c.env.DB);
      const id = parseInt(c.req.param("id"));
      const trade = c.req.valid("json");
      await db.update(tradeTable).set(trade).where(eq(tradeTable.id, id));
      return c.json({ message: "更新しました" }, 200);
    } catch (e) {
      return c.json({ error: e }, 500);
    }
  })
  .delete(":id", async (c) => {
    try {
      const db = drizzle(c.env.DB);
      const id = parseInt(c.req.param("id"));
      await db.delete(tradeTable).where(eq(tradeTable.id, id));
      return c.json({ message: "削除しました" }, 200);
    } catch (e) {
      return c.json({ error: e }, 500);
    }
  });

export default trade;
