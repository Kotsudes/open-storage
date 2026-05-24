import { z } from "zod";

export const warehouseSchema = z.object({
    id: z.bigint(),

    name: z.string().min(1),

    address: z.string().optional(),

    createdAt: z.date(),

    updatedAt: z.date(),
});

export type Warehouse = z.infer<typeof warehouseSchema>;
