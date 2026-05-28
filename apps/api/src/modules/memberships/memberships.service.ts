import { Injectable } from "@nestjs/common";
import { CreateMembershipDto } from "./dto/create-membership.dto";
import { UpdateMembershipDto } from "./dto/update-membership.dto";
import { PrismaService } from "@/modules/prisma/prisma.service";

@Injectable()
export class MembershipsService {
    constructor(private prismaService: PrismaService) {}

    create(createMembershipDto: CreateMembershipDto) {
        return this.prismaService.membership.create({
            data: createMembershipDto,
        });
    }

    findAll() {
        return this.prismaService.membership.findMany();
    }

    findOne(id: number) {
        return this.prismaService.membership.findUnique({ where: { id } });
    }

    update(id: number, updateMembershipDto: UpdateMembershipDto) {
        return this.prismaService.membership.update({
            where: { id },
            data: updateMembershipDto,
        });
    }

    remove(id: number) {
        return this.prismaService.membership.delete({ where: { id } });
    }
}
