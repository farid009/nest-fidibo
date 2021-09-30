import { Question } from '@prisma/client';
import { Id } from '../../shared/types';

export class QuestionRoDto {
  id!: Id;
  stem!: string;
  option1!: string;
  option2!: string;
  option3!: string;
  option4!: string;
  correctOptionNumber!: number;
  explanation!: string;

  constructor(question: Question) {
    this.id = question.id;
    this.stem = question.stem;
    this.option1 = question.option1;
    this.option2 = question.option2;
    this.option3 = question.option3;
    this.option4 = question.option4;
    this.correctOptionNumber = question.correctOptionNumber;
    this.explanation = question.explanation;
  }
}
