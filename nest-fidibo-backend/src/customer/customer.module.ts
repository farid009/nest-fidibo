import { Module } from '@nestjs/common';
import { PrismaModule } from '../shared/modules/prisma-management/prisma.module';
import { CustomerController } from './customer.controller';
import { customerProviders } from './customer.provider';

@Module({
  imports: [PrismaModule],
  providers: customerProviders,
  controllers: [CustomerController],
  exports: customerProviders,
})
export class CustomerModule {}
