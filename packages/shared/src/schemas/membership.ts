import { z } from "zod";
import { userSchema } from "./user";
import { warehouseSchema } from "./warehouse";

export const membershipSchema = z.object({
    id: z.bigint(),

    user: userSchema,

    warehouse: warehouseSchema,

    role: z.enum(["OWNER", "ADMIN", "MEMBER"]),

    createdAt: z.date(),

    updatedAt: z.date(),
});

export type Membership = z.infer<typeof membershipSchema>;
