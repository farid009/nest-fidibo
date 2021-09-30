import { Injectable } from '@nestjs/common';
import { Module, Prisma } from '@prisma/client';
import { PrismaService } from '../shared/modules/prisma-management/prisma.service';

@Injectable()
export class ModuleService {
  constructor(private prismaService: PrismaService) {}

  async add(ModuleObj: Prisma.ModuleCreateInput): Promise<Module> {
    const module = await this.prismaService.module.create({
      data: ModuleObj,
    });

    return module;
  }
}
