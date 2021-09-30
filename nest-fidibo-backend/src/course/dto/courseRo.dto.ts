import { Course } from '@prisma/client';
import { Id } from '../../shared/types';

export class CourseRoDto {
  id!: Id;
  name!: string;
  teacherName!: string;

  constructor(course: Course) {
    this.id = course.id;
    this.name = course.name;
    this.teacherName = course.teacherName;
  }
}
