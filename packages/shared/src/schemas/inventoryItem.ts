import { z } from "zod";
import { inventorySchema } from "./inventory";
import { itemSchema } from "./item";

export const inventoryItemSchema = z.object({
    id: z.bigint(),

    inventory: inventorySchema,

    item: itemSchema,

    quantity: z.number().nonnegative(),

    expiryDate: z.date().optional(),

    createdAt: z.date(),

    updatedAt: z.date(),
});

export type InventoryItem = z.infer<typeof inventoryItemSchema>;
