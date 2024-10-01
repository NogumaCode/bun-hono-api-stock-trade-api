import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { stockTable } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { stockSchema } from "../../lib/validations/stock";
import { codeRule } from "../../config/regex";

const stock = new Hono<{ Bindings: Bindings }>();
//情報を取得
stock
  .get("/", async (c) => {
    try {
      const db = drizzle(c.env.DB);
      const res = await db.select().from(stockTable);

      if (res.length === 0) {
        return c.json({ error: "登録データがありません" }, 404);
      }
      return c.json(res);
    } catch (e) {
      return c.json(
        { error: e instanceof Error ? e.message : "エラーが発生しました" },
        500
      );
    }
  })
  .post("/", zValidator("json", stockSchema), async (c) => {
    try {
      // const stock = c.req.valid("json");
      const stock = stockSchema.parse(c.req.valid("json"));

      const db = drizzle(c.env.DB);
      await db.insert(stockTable).values(stock);
      return c.json({ message: "登録しました" }, 200);
    } catch (e) {
      return c.json({ error: "既に登録されています" }, 500);
    }
  })
  .get(`/:code{${codeRule}}`, async (c) => {
    try {
      const db = drizzle(c.env.DB);
      const code = c.req.param("code");
      const res = await db
        .select()
        .from(stockTable)
        .where(eq(stockTable.code, code));
      if (res.length === 0) {
        return c.json({ error: "登録データがありません" }, 404);
      }
      return c.json(res);
    } catch (e) {
      return c.json({ error: e }, 500);
    }
  })
  .delete("/:code", async (c) => {
    try{
      const db = drizzle(c.env.DB);
      const code = c.req.param("code");
      await db.delete(stockTable).where(eq(stockTable.code, code));
      return c.json({ message: "登録を削除しました" }, 200);

    }catch(e){
      return c.json({error: e},500)
    }
  });

export default stock;
