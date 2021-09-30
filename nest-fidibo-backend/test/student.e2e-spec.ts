import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Course, Customer } from '@prisma/client';
import { useContainer } from 'class-validator';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/shared/modules/prisma-management/prisma.service';

describe('Students (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let customer: Customer;
  let course: Course;

  const studentShape = expect.objectContaining({
    id: expect.any(Number),
    name: expect.any(String),
    courseId: expect.any(Number),
  });

  beforeAll(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = testModule.createNestApplication();
    prisma = app.get<PrismaService>(PrismaService);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();

    customer = await prisma.customer.create({
      data: {
        name: 'test',
        email: 'test@gmail.com',
        phone: 'test',
        password: 'tes',
      },
    });
    course = await prisma.course.create({
      data: { name: 'test', teacherName: 'test' },
    });
    await prisma.student.create({
      data: {
        name: 'Student1',
        startTime: new Date(),
        customerId: customer.id,
        courseId: course.id,
      },
    });

    await prisma.student.create({
      data: {
        name: 'Student2',
        startTime: new Date(),
        customerId: customer.id,
        courseId: course.id,
      },
    });

    await prisma.student.create({
      data: {
        name: 'Student3',
        startTime: new Date(),
        customerId: customer.id,
        courseId: course.id,
      },
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  describe('GET /students', () => {
    it('returns a list of students', async () => {
      const { status, body } = await request(app.getHttpServer()).get(
        '/v1/customers/students/',
      );

      expect(status).toBe(200);
    });
  });
});
