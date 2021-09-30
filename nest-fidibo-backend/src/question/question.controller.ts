import {
  Body,
  Controller,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Id } from '../shared/types';
import { AnswerToQuestion } from './dto';
import { QuestionService } from './question.service';

@Controller('v1/questions')
@UsePipes(
  new ValidationPipe({
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  }),
)
@ApiTags('questions')
@ApiBearerAuth('access-token')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Post(':id/studentId/:studentId/answer')
  async answerToQuestion(
    @Param('id') questionId: Id,
    @Param('studentId') studentId: Id,
    @Body() answerObj: AnswerToQuestion,
  ): Promise<{ result: boolean }> {
    return await this.questionService.answerToQuestion(
      studentId,
      questionId,
      answerObj.answer,
    );
  }
}
