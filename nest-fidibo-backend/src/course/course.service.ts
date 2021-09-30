import { Injectable } from '@nestjs/common';
import { Course, Prisma } from '@prisma/client';
import { PrismaService } from '../shared/modules/prisma-management/prisma.service';

@Injectable()
export class CourseService {
  constructor(private prismaService: PrismaService) {}

  async add(CourseObj: Prisma.CourseCreateInput): Promise<Course> {
    const course = await this.prismaService.course.create({
      data: CourseObj,
    });

    return course;
  }
}
