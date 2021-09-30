import { Customer } from '@prisma/client';
import { Id } from '../../shared/types';

export class CustomerRoDto {
  id!: Id;
  name!: string;

  constructor(customer: Customer) {
    this.id = customer.id;
    this.name = customer.name;
  }
}
