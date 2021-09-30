import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CourseService } from '../course/course.service';
import { CourseRoDto, CreateCourseDto } from '../course/dto';
import { CustomerService } from '../customer/customer.service';
import { CreateCustomerDto, CustomerRoDto } from '../customer/dto';
import { CreateModuleDto, ModuleRoDto } from '../module/dto';
import { ModuleService } from '../module/module.service';
import { CreateQuestionDto, QuestionRoDto } from '../question/dto';
import { QuestionService } from '../question/question.service';
import { Id } from '../shared/types';
import { AdminService } from './admin.service';

@Controller('v1/admin')
@UsePipes(
  new ValidationPipe({
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  }),
)
@ApiTags('admin')
@ApiBearerAuth('access-token')
export class AdminController {
  constructor(
    private adminService: AdminService,
    private customerService: CustomerService,
    private moduleService: ModuleService,
    private questionService: QuestionService,
    private courseService: CourseService,
  ) {}

  @Post('customers')
  async createCustomer(
    @Body() customerObj: CreateCustomerDto,
  ): Promise<CustomerRoDto> {
    const customer = await this.customerService.add({
      name: customerObj.name,
      email: customerObj.email,
      phone: customerObj.phone,
      password: customerObj.password,
    });

    return new CustomerRoDto(customer);
  }

  @Post('modules')
  async createModules(
    @Body() moduleObj: CreateModuleDto,
  ): Promise<ModuleRoDto> {
    const module = await this.moduleService.add({
      name: moduleObj.name,
      course: { connect: { id: moduleObj.courseId } },
    });

    return new ModuleRoDto(module);
  }

  @Post('questions')
  async createQuestion(
    @Body() questionObj: CreateQuestionDto,
  ): Promise<QuestionRoDto> {
    const question = await this.questionService.add({
      stem: questionObj.stem,
      explanation: questionObj.explanation,
      option1: questionObj.option1,
      option2: questionObj.option2,
      option3: questionObj.option3,
      option4: questionObj.option4,
      correctOptionNumber: questionObj.correctOptionNumber,
      module: { connect: { id: questionObj.moduleId } },
    });

    return new QuestionRoDto(question);
  }

  @Post('courses')
  async createCourse(@Body() courseObj: CreateCourseDto): Promise<CourseRoDto> {
    const course = await this.courseService.add({
      name: courseObj.name,
      teacherName: courseObj.teacherName,
    });

    return new CourseRoDto(course);
  }

  @Post('question-answers/random-number/:randomNumber')
  async createRandomAnswers(
    @Query('randomNumber') randomNumber: number,
  ): Promise<void> {
    await this.adminService.addRandomAnswersToStudents(randomNumber);
  }

  @Post('students/random-number/:randomNumber')
  async createRandomStudents(
    @Query('randomNumber') randomNumber: number,
  ): Promise<void> {
    await this.adminService.addRandomStudents(randomNumber);
  }

  @Get('answer-report/student/:studentId/course/:courseId')
  async getStudentReportByStudentIdAndCourseId(
    @Param('studentId') studentId: Id,
    @Param('courseId') courseId: Id,
  ): Promise<{
    courseQuestionAnswersCount: number;
    courseQuestionAnswersCorrectPercentage: number;
  }> {
    return await this.adminService.getStudentReportByStudentIdAndCourseId(
      studentId,
      courseId,
    );
  }

  @Get('customer-and-student-number-report')
  async getCustomerAndStudentNumberReport(): Promise<{
    customersCount: number;
    studentsCount: number;
  }> {
    return await this.adminService.getCustomersAndStudentsCount();
  }
}
