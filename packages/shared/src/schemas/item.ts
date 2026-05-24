import { z } from "zod";
import { unitSchema } from "./unit";

export const itemSchema = z.object({
    id: z.bigint(),

    unit: unitSchema,

    name: z.string().min(1),

    createdAt: z.date(),

    updatedAt: z.date(),
});

export type Item = z.infer<typeof itemSchema>;
