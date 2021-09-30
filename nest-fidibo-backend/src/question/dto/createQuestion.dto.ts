import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import { Id } from '../../shared/types';

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsString()
  stem!: string;

  @IsNotEmpty()
  @IsString()
  option1!: string;

  @IsNotEmpty()
  @IsString()
  option2!: string;

  @IsNotEmpty()
  @IsString()
  option3!: string;

  @IsNotEmpty()
  @IsString()
  option4!: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(4)
  correctOptionNumber!: number;

  @IsNotEmpty()
  @IsString()
  explanation!: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  moduleId!: Id;
}
