import { z } from "zod";

export const unitSchema = z.object({
    id: z.int(),

    name: z.string().min(1),

    description: z.string().optional(),

    symbol: z.string().optional(),

    createdAt: z.date(),

    updatedAt: z.date(),
});

export type Unit = z.infer<typeof unitSchema>;
