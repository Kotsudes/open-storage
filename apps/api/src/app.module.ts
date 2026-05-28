import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { AuthModule } from "@thallesp/nestjs-better-auth";
import { auth } from "@/lib/auth";
import { WarehousesModule } from "./modules/warehouses/warehouses.module";
import { PrismaService } from "./modules/prisma/prisma.service";
import { InventoriesModule } from "./modules/inventories/inventories.module";
import { UnitsModule } from "./modules/units/units.module";
import { ItemsModule } from "./modules/items/items.module";
import { InventoryItemsModule } from "./modules/inventory-items/inventory-items.module";
import { MembershipsModule } from "./modules/memberships/memberships.module";

@Module({
    imports: [
        AuthModule.forRoot({ auth }),
        WarehousesModule,
        InventoriesModule,
        UnitsModule,
        ItemsModule,
        InventoryItemsModule,
        MembershipsModule,
    ],
    controllers: [AppController],
    providers: [AppService, PrismaService],
})
export class AppModule {}
