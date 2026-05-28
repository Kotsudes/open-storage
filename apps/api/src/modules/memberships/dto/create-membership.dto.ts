import { Role } from "@/prisma/generated/enums";
import { IsEnum, IsNumber, IsString } from "class-validator";

export class CreateMembershipDto {
    @IsString()
    readonly userId!: string;

    @IsNumber()
    readonly warehouseId!: number;

    @IsEnum(Role)
    readonly role!: Role;
}
