import { Injectable } from '@nestjs/common';
import { Prisma, Question, Student } from '@prisma/client';
import { PrismaService } from '../shared/modules/prisma-management/prisma.service';
import { Id } from '../shared/types';

@Injectable()
export class StudentService {
  constructor(private prismaService: PrismaService) {}

  async add(StudentObj: Prisma.StudentCreateInput): Promise<Student> {
    const student = await this.prismaService.student.create({
      data: StudentObj,
    });

    return student;
  }

  async getStudentQuestionsByStudentId(studentId: Id): Promise<Question[]> {
    const questions = await this.prismaService.question.findMany({
      where: { module: { course: { students: { some: { id: studentId } } } } },
    });

    return questions;
  }
}
