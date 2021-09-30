import { Module } from '@nestjs/common';
import { PrismaModule } from '../shared/modules/prisma-management/prisma.module';
import { ModuleController } from './module.controller';
import { moduleProviders } from './module.provider';

@Module({
  imports: [PrismaModule],
  providers: moduleProviders,
  controllers: [ModuleController],
  exports: moduleProviders,
})
export class ModuleModule {}
