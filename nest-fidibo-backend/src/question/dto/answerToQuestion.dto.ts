import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class AnswerToQuestion {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(4)
  answer: number;
}
