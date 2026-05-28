import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from "@nestjs/common";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";

import { WarehousesService } from "./warehouses.service";
import { CreateWarehouseDto } from "./dto/create-warehouse.dto";
import { UpdateWarehouseDto } from "./dto/update-warehouse.dto";

@Controller("warehouses")
export class WarehousesController {
    constructor(private readonly warehousesService: WarehousesService) {}

    @Post()
    create(
        @Body() createWarehouseDto: CreateWarehouseDto,
        @Session() userSession: UserSession
    ) {
        return this.warehousesService.create(
            createWarehouseDto,
            userSession.session.userId
        );
    }

    @Get()
    findAll() {
        return this.warehousesService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.warehousesService.findOne(+id);
    }

    @Post("users")
    findUserWarehouses(@Body("userId") userId: string) {
        return this.warehousesService.findUserWarehouses(userId);
    }

    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updateWarehouseDto: UpdateWarehouseDto
    ) {
        return this.warehousesService.update(+id, updateWarehouseDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.warehousesService.remove(+id);
    }
}
