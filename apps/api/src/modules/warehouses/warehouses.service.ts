import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "@/modules/prisma/prisma.service";

import { CreateWarehouseDto } from "./dto/create-warehouse.dto";
import { UpdateWarehouseDto } from "./dto/update-warehouse.dto";

@Injectable()
export class WarehousesService {
    constructor(private prisma: PrismaService) {}

    private readonly logger = new Logger(WarehousesService.name);

    async create(createWarehouseDto: CreateWarehouseDto, userId: string) {
        const warehouse = await this.prisma.$transaction(async (tx) => {
            const warehouse = await tx.warehouse.create({
                data: createWarehouseDto,
            });

            await tx.membership.create({
                data: {
                    userId: userId,
                    warehouseId: warehouse.id,
                    role: "OWNER",
                },
            });

            return warehouse;
        });

        return warehouse;
    }

    findAll() {
        return this.prisma.warehouse.findMany();
    }

    findOne(id: number) {
        return this.prisma.warehouse.findUnique({
            where: { id },
        });
    }

    findUserWarehouses(userId: string) {
        this.logger.log("test");
        return this.prisma.warehouse.findMany({
            where: {
                memberships: {
                    some: {
                        userId: userId,
                    },
                },
            },
        });
    }

    update(id: number, updateWarehouseDto: UpdateWarehouseDto) {
        return this.prisma.warehouse.update({
            where: { id },
            data: updateWarehouseDto,
        });
    }

    remove(id: number) {
        return this.prisma.warehouse.delete({
            where: { id },
        });
    }
}
