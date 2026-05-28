import { Module } from "@nestjs/common";
import { InventoryItemsService } from "./inventory-items.service";
import { InventoryItemsController } from "./inventory-items.controller";
import { PrismaService } from "@/modules/prisma/prisma.service";

@Module({
    controllers: [InventoryItemsController],
    providers: [InventoryItemsService, PrismaService],
})
export class InventoryItemsModule {}
