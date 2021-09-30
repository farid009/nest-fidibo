import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Id } from '../../shared/types';

export class CreateModuleDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsInt()
  courseId!: Id;
}
