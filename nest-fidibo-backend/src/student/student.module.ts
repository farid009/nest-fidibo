import { Module } from '@nestjs/common';
import { PrismaModule } from '../shared/modules/prisma-management/prisma.module';
import { StudentController } from './student.controller';
import { studentProviders } from './student.provider';

@Module({
  imports: [PrismaModule],
  providers: studentProviders,
  controllers: [StudentController],
  exports: studentProviders,
})
export class StudentModule {}
