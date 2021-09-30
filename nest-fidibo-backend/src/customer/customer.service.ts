import { Injectable } from '@nestjs/common';
import { Customer, Prisma } from '@prisma/client';
import { PrismaService } from '../shared/modules/prisma-management/prisma.service';
import { CustomerWithStudents } from './customer.type';

@Injectable()
export class CustomerService {
  constructor(private prismaService: PrismaService) {}

  async add(CustomerObj: Prisma.CustomerCreateInput): Promise<Customer> {
    const customer = await this.prismaService.customer.create({
      data: CustomerObj,
    });

    return customer;
  }

  async getCustomerAndStudents(): Promise<CustomerWithStudents[]> {
    return await this.prismaService.customer.findMany({
      include: { students: true },
    });
  }
}
