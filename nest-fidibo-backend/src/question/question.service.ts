import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Question } from '@prisma/client';
import { PrismaService } from '../shared/modules/prisma-management/prisma.service';
import { Id } from '../shared/types';

@Injectable()
export class QuestionService {
  constructor(private prismaService: PrismaService) {}

  async add(QuestionObj: Prisma.QuestionCreateInput): Promise<Question> {
    const question = await this.prismaService.question.create({
      data: QuestionObj,
    });

    return question;
  }

  async answerToQuestion(
    studentId: Id,
    questionId: Id,
    answer: number,
  ): Promise<{ result: boolean }> {
    const studentExistResult =
      (await this.prismaService.student.count({ where: { id: studentId } })) >
      0;

    if (!studentExistResult) {
      throw new NotFoundException('دانش آموز یافت نشد');
    }

    const question = await this.prismaService.question.findFirst({
      where: { id: questionId },
    });

    if (!question) {
      throw new NotFoundException('سوال یافت نشد');
    }

    await this.prismaService.questionAnswer.create({
      data: {
        studentId: studentId,
        questionId: questionId,
        answer: answer,
        status: answer === question.correctOptionNumber,
      },
    });

    return { result: question.correctOptionNumber === answer };
  }
}
