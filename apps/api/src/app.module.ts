import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { AuthModule } from "@thallesp/nestjs-better-auth";
import { auth } from "@/lib/auth";
import { WarehousesModule } from "./modules/warehouses/warehouses.module";
import { PrismaService } from "./modules/prisma/prisma.service";

@Module({
    imports: [AuthModule.forRoot({ auth }), WarehousesModule],
    controllers: [AppController],
    providers: [AppService, PrismaService],
})
export class AppModule {}
