import { Module } from "@nestjs/common";
import { WarehousesService } from "./warehouses.service";
import { WarehousesController } from "./warehouses.controller";
import { PrismaService } from "@/modules/prisma/prisma.service";
import { Logger } from "@nestjs/common";

@Module({
    controllers: [WarehousesController],
    providers: [WarehousesService, PrismaService, Logger],
})
export class WarehousesModule {}
