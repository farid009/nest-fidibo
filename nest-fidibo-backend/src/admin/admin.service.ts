import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as faker from 'faker';
import { PrismaService } from '../shared/modules/prisma-management/prisma.service';
import { Id } from '../shared/types';

@Injectable()
export class AdminService {
  constructor(private prismaService: PrismaService) {}

  async addRandomStudents(number: number): Promise<void> {
    faker.setLocale('fa');

    const [customerIdObjs, courseIdObjs] = await Promise.all([
      this.prismaService.customer.findMany({ select: { id: true } }),
      this.prismaService.course.findMany({ select: { id: true } }),
    ]);
    const customerIds = customerIdObjs.map((s) => s.id);
    const courseIds = courseIdObjs.map((q) => q.id);
    const studentObjs: Prisma.StudentCreateManyInput[] = [];

    for (let i = 0; i < number; i++) {
      studentObjs.push({
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        startTime: new Date(),
        customerId: customerIds[Math.floor(Math.random() * customerIds.length)],
        courseId: courseIds[Math.floor(Math.random() * courseIds.length)],
      });
    }
    await this.prismaService.student.createMany({
      data: studentObjs,
    });
  }

  async addRandomAnswersToStudents(number: number): Promise<void> {
    const possibleAnswers = [1, 2, 3, 4];
    const [studentObjs, questionObjs] = await Promise.all([
      this.prismaService.student.findMany({ select: { id: true } }),
      this.prismaService.question.findMany({
        select: { id: true, correctOptionNumber: true },
      }),
    ]);
    const questionAnswerObjs: Prisma.QuestionAnswerCreateManyInput[] = [];

    for (const studentObj of studentObjs) {
      for (let i = 0; i < number; i++) {
        const selectedQuestion =
          questionObjs[Math.floor(Math.random() * questionObjs.length)];
        const selectedAnswer =
          possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)];

        questionAnswerObjs.push({
          answer: selectedAnswer,
          status: selectedAnswer === selectedQuestion.correctOptionNumber,
          studentId: studentObj.id,
          questionId: selectedQuestion.id,
        });
      }
    }

    await this.prismaService.questionAnswer.createMany({
      data: questionAnswerObjs,
    });
  }

  async getCustomersAndStudentsCount(): Promise<{
    customersCount: number;
    studentsCount: number;
  }> {
    const [customersCount, studentsCount] = await Promise.all([
      this.prismaService.customer.count(),
      this.prismaService.student.count(),
    ]);

    return { customersCount, studentsCount };
  }

  async getStudentReportByStudentIdAndCourseId(
    studentId: Id,
    courseId: Id,
  ): Promise<{
    courseQuestionAnswersCount: number;
    courseQuestionAnswersCorrectPercentage: number;
  }> {
    const [courseQuestionAnswersCount, courseQuestionAnswersCorrectCount] =
      await Promise.all([
        this.prismaService.$queryRaw<number[]>(
          Prisma.sql`select count(distinct question_id) from question_answer where student_id = ${studentId} and question_id in (select question.id from question inner join "module" on question.module_id = "module".id and "module".course_id  = ${courseId})`,
        ),
        this.prismaService.$queryRaw<number[]>(
          Prisma.sql`select count(distinct question_id) from question_answer where student_id = ${studentId} and status = true and question_id in (select question.id from question inner join "module" on question.module_id = "module".id and "module".course_id  = ${courseId})`,
        ),
      ]);

    return {
      courseQuestionAnswersCount: courseQuestionAnswersCount[0],
      courseQuestionAnswersCorrectPercentage:
        (courseQuestionAnswersCorrectCount[0] / courseQuestionAnswersCount[0]) *
        100,
    };
  }
}
