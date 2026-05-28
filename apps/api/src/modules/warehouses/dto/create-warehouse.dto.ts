import { Transform } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateWarehouseDto {
    @ApiProperty({
        description: "The name of the warehouse",
        example: "Main Warehouse",
    })
    @IsString()
    @IsNotEmpty()
    readonly name!: string;

    @ApiProperty({
        description: "The address of the warehouse",
        example: "123 Main Street",
    })
    @IsString()
    @IsOptional()
    @Transform(({ value }: { value: unknown }) =>
        typeof value === "string" ? value.toLowerCase() : value
    )
    readonly address?: string;
}
