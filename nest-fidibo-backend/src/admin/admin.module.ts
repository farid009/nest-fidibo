import { Module } from '@nestjs/common';
import { CourseModule } from '../course/course.module';
import { CustomerModule } from '../customer/customer.module';
import { ModuleModule } from '../module/module.module';
import { QuestionModule } from '../question/question.module';
import { PrismaModule } from '../shared/modules/prisma-management/prisma.module';
import { AdminController } from './admin.controller';
import { adminProviders } from './admin.provider';

@Module({
  imports: [
    PrismaModule,
    CustomerModule,
    ModuleModule,
    CourseModule,
    QuestionModule,
  ],
  providers: adminProviders,
  controllers: [AdminController],
  exports: adminProviders,
})
export class AdminModule {}
