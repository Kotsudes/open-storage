import { z } from "zod";
import { warehouseSchema } from "./warehouse";
import { inventoryItemNestedSchema } from "./inventoryItem";

export const inventoryTypeEnum = z.enum([
    "FRIDGE",
    "FREEZER",
    "PANTRY",
    "CLOSET",
    "CELLAR",
    "OTHER",
]);

export type InventoryType = z.infer<typeof inventoryTypeEnum>;

export const inventoryNestedSchema = z.object({
    id: z.number(),

    name: z.string().min(1),

    temperature: z.number().optional(),

    type: inventoryTypeEnum,

    createdAt: z.date(),

    updatedAt: z.date(),
});

export type InventoryNested = z.infer<typeof inventoryNestedSchema>;

export const inventorySchema = z.object({
    id: z.number(),

    warehouse: z.lazy(() => warehouseSchema),

    name: z.string().min(1),

    temperature: z.number().optional(),

    type: inventoryTypeEnum,

    inventoryItems: z.array(z.lazy(() => inventoryItemNestedSchema)).optional(),

    createdAt: z.date(),

    updatedAt: z.date(),
});

export type Inventory = z.infer<typeof inventorySchema>;
