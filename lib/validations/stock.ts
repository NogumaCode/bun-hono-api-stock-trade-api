import { z } from "zod";
import { codeRegex } from "../../config/regex";

export const stockSchema = z.object({
  code: z.string().regex(codeRegex),
  stockName:z.string().trim().min(2).max(128),
  market: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.enum(["プライム", "スタンダード", "グロース"], {
      required_error: "market フィールドは必須です",
      invalid_type_error: "プライム、スタンダード、グロースのいずれかを指定してください",
    })
  ),
})
