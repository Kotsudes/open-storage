import { z } from "zod";
import { unitSchema } from "./unit";
import { inventoryItemNestedSchema } from "./inventoryItem";

export const itemNestedSchema = z.object({
    id: z.bigint(),

    name: z.string().min(1),

    createdAt: z.date(),

    updatedAt: z.date(),
});
export type ItemNested = z.infer<typeof itemNestedSchema>;

export const itemSchema = z.object({
    id: z.bigint(),

    unit: z.lazy(() => unitSchema),

    name: z.string().min(1),

    inventoryItems: z.array(z.lazy(() => inventoryItemNestedSchema)).optional(),

    createdAt: z.date(),

    updatedAt: z.date(),
});

export type Item = z.infer<typeof itemSchema>;
