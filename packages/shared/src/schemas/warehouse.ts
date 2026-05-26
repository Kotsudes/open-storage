import { z } from "zod";
import { membershipNestedSchema } from "./membership";
import { inventoryItemNestedSchema } from "./inventoryItem";

export const warehouseSchema = z.object({
    id: z.bigint(),

    name: z.string().min(1),

    address: z.string().optional(),

    memberships: z.array(membershipNestedSchema).optional(),

    inventories: z.array(z.lazy(() => inventoryItemNestedSchema)).optional(),

    createdAt: z.date(),

    updatedAt: z.date(),
});

export type Warehouse = z.infer<typeof warehouseSchema>;
