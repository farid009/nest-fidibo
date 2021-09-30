import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { CustomerAndStudentsRoDto } from './dto';

@Controller('v1/customers')
@ApiTags('customers')
@ApiBearerAuth('access-token')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get('students')
  async getCustomerStudents(): Promise<CustomerAndStudentsRoDto[]> {
    const customerAndStudents =
      await this.customerService.getCustomerAndStudents();

    return customerAndStudents.map((cs) => new CustomerAndStudentsRoDto(cs));
  }
}
