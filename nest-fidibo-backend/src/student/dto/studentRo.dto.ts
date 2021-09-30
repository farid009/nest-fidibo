import { Student } from '@prisma/client';
import { Id } from '../../shared/types';

export class StudentRoDto {
  id!: Id;
  name!: string;
  courseId!: Id;

  constructor(student: Student) {
    this.id = student.id;
    this.name = student.name;
    this.courseId = student.courseId;
  }
}
