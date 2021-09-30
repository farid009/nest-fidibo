import { Customer, Student } from '@prisma/client';

export type CustomerWithStudents = Customer & { students: Student[] };
