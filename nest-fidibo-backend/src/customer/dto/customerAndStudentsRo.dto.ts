import { Id } from '../../shared/types';
import { StudentRoDto } from '../../student/dto';
import { CustomerWithStudents } from '../customer.type';

export class CustomerAndStudentsRoDto {
  id!: Id;
  name!: string;
  students!: StudentRoDto[];

  constructor(customer: CustomerWithStudents) {
    this.id = customer.id;
    this.name = customer.name;
    this.students = customer.students.map((cs) => new StudentRoDto(cs));
  }
}
