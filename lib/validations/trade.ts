import { z } from "zod";
import { codeRegex } from "../../config/regex";

export const tradeSchema = z.object({
  id: z.number().int().nonnegative(),
  code: z.string().regex(codeRegex),
  shares: z.number().nonnegative(),
  price: z.number().nonnegative(),
  buySell: z.enum(["買", "売"]),
  tradingDate: z.string().date(),
});

export const createTradeSchema = tradeSchema.omit({ id: true });
