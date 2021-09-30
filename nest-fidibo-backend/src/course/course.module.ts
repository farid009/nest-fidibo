import { Module } from '@nestjs/common';
import { PrismaModule } from '../shared/modules/prisma-management/prisma.module';
import { CourseController } from './course.controller';
import { courseProviders } from './course.provider';

@Module({
  imports: [PrismaModule],
  providers: courseProviders,
  controllers: [CourseController],
  exports: courseProviders,
})
export class CourseModule {}
