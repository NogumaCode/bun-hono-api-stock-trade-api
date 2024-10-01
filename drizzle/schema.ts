import { relations } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const stockTable = sqliteTable("stock_table", {
  code: text("code", { length: 4 }).primaryKey(),
  stockName: text("stock_name").notNull(),
  market: text("market", {
    enum: ["プライム", "スタンダード", "グロース"],
  }).notNull(),
});

export const tradeTable = sqliteTable("trade_table", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  code: text("code", { length: 4 })
    .references(() => stockTable.code)
    .notNull(),
  shares: integer("shares").notNull(),
  price: real("price").notNull(),
  buySell: text("buy_sell", { enum: ["買", "売"] }).notNull(),
  tradingDate: text("trading_date").notNull(),
});

export const stockRelations = relations(stockTable, ({ many }) => ({
  trades: many(tradeTable),
}));

export const tradeRelations = relations(tradeTable, ({ one }) => ({
  stock: one(stockTable, {
    fields: [tradeTable.code],
    references: [stockTable.code],
  }),
}));

export const schema = {
  stockTable,
  tradeTable,
  stockRelations,
  tradeRelations,
};
