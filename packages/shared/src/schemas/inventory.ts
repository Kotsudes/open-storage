import { z } from "zod";
import { warehouseSchema } from "./warehouse";

export const inventoryTypeEnum = z.enum([
    "FRIDGE",
    "FREEZER",
    "PANTRY",
    "CLOSET",
    "CELLAR",
    "OTHER",
]);

export type InventoryType = z.infer<typeof inventoryTypeEnum>;

export const inventorySchema = z.object({
    id: z.bigint(),

    warehouse: warehouseSchema,

    name: z.string().min(1),

    temperature: z.number().optional(),

    type: inventoryTypeEnum,

    createdAt: z.date(),

    updatedAt: z.date(),
});

export type Inventory = z.infer<typeof inventorySchema>;
