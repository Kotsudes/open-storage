import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateItemDto {
    @IsNumber()
    readonly unitId!: number;

    @IsNotEmpty()
    @IsString()
    readonly name!: string;
}
