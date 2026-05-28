import { Injectable } from "@nestjs/common";
import { CreateInventoryItemDto } from "./dto/create-inventory-item.dto";
import { UpdateInventoryItemDto } from "./dto/update-inventory-item.dto";
import { PrismaService } from "@/modules/prisma/prisma.service";

@Injectable()
export class InventoryItemsService {
    constructor(private prisma: PrismaService) {}

    create(createInventoryItemDto: CreateInventoryItemDto) {
        return this.prisma.inventoryItem.create({
            data: createInventoryItemDto,
        });
    }

    findAll() {
        return this.prisma.inventoryItem.findMany();
    }

    findOne(id: number) {
        return this.prisma.inventoryItem.findUnique({
            where: { id },
        });
    }

    update(id: number, updateInventoryItemDto: UpdateInventoryItemDto) {
        return this.prisma.inventoryItem.update({
            where: { id },
            data: updateInventoryItemDto,
        });
    }

    remove(id: number) {
        return this.prisma.inventoryItem.delete({
            where: { id },
        });
    }
}
