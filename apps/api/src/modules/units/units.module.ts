import { Module } from "@nestjs/common";
import { UnitsService } from "./units.service";
import { UnitsController } from "./units.controller";
import { PrismaService } from "@/modules/prisma/prisma.service";

@Module({
    controllers: [UnitsController],
    providers: [UnitsService, PrismaService],
})
export class UnitsModule {}
