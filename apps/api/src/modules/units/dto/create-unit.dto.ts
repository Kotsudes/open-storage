import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUnitDto {
    @IsNotEmpty()
    @IsString()
    readonly name!: string;

    @IsOptional()
    @IsString()
    readonly description?: string;

    @IsOptional()
    @IsString()
    readonly symbol?: string;
}
