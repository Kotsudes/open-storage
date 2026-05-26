import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/modules/prisma/prisma.service";

import { CreateWarehouseDto } from "./dto/create-warehouse.dto";
import { UpdateWarehouseDto } from "./dto/update-warehouse.dto";

@Injectable()
export class WarehousesService {
    constructor(private prisma: PrismaService) {}

    create(createWarehouseDto: CreateWarehouseDto) {
        return this.prisma.warehouse.create({
            data: createWarehouseDto,
        });
    }

    findAll() {
        return this.prisma.warehouse.findMany();
    }

    findOne(id: number) {
        return this.prisma.warehouse.findUnique({
            where: { id },
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
