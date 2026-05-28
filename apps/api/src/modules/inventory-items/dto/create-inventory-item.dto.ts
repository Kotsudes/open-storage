import { IsDate, IsNumber, IsOptional, IsPositive } from "class-validator";

export class CreateInventoryItemDto {
    @IsNumber()
    readonly inventoryId!: number;

    @IsNumber()
    readonly itemId!: number;

    @IsPositive()
    @IsNumber()
    readonly quantity!: number;

    @IsOptional()
    @IsDate()
    readonly expiryDate?: Date;
}
