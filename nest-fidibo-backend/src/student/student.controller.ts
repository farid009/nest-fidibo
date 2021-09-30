import {
  Controller,
  Get,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { QuestionRoDto } from '../question/dto';
import { Id } from '../shared/types';
import { StudentService } from './student.service';

@Controller('v1/students')
@UsePipes(
  new ValidationPipe({
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  }),
)
@ApiTags('students')
@ApiBearerAuth('access-token')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get(':id/questions')
  async getStudentQuestions(
    @Param('id') studentId: Id,
  ): Promise<QuestionRoDto[]> {
    const questions = await this.studentService.getStudentQuestionsByStudentId(
      studentId,
    );

    return questions.map((q) => new QuestionRoDto(q));
  }
}
