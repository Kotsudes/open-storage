import {
    IsString,
    IsNumber,
    IsOptional,
    IsNotEmpty,
    IsEnum,
} from "class-validator";
import { InventoryType } from "@/prisma/generated/enums";

export class CreateInventoryDto {
    @IsNumber()
    readonly warehouseId!: number;

    @IsNotEmpty()
    @IsString()
    readonly name!: string;

    @IsOptional()
    @IsNumber()
    readonly temperature?: number;

    @IsEnum(InventoryType)
    readonly type!: InventoryType;
}
