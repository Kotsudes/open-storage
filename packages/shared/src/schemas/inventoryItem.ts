import { z } from "zod";
import { inventoryNestedSchema, inventorySchema } from "./inventory";
import { itemSchema } from "./item";

export const inventoryItemNestedSchema = z.object({
    id: z.bigint(),
    quantity: z.number().nonnegative(),
    expiryDate: z.date().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
});
export type InventoryItemNested = z.infer<typeof inventoryItemNestedSchema>;

export const inventoryItemSchema = z.object({
    id: z.bigint(),

    inventory: z.lazy(() => inventorySchema),

    item: z.lazy(() => itemSchema),

    quantity: z.number().nonnegative(),

    expiryDate: z.date().optional(),

    inventories: z.array(z.lazy(() => inventoryNestedSchema)).optional(),

    createdAt: z.date(),

    updatedAt: z.date(),
});

export type InventoryItem = z.infer<typeof inventoryItemSchema>;
