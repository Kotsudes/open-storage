import { z } from "zod";
import { userSchema } from "./user";
import { warehouseSchema } from "./warehouse";

export const membershipNestedSchema = z.object({
    id: z.number(),

    user: userSchema,

    role: z.enum(["OWNER", "ADMIN", "MEMBER"]),

    createdAt: z.date(),

    updatedAt: z.date(),
});

export type MembershipNested = z.infer<typeof membershipNestedSchema>;

export const membershipSchema = z.object({
    id: z.number(),

    user: userSchema,

    warehouse: z.lazy(() => warehouseSchema),

    role: z.enum(["OWNER", "ADMIN", "MEMBER"]),

    createdAt: z.date(),

    updatedAt: z.date(),
});

export type Membership = z.infer<typeof membershipSchema>;
