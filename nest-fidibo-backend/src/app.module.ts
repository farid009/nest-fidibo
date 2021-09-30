import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import configuration from './configs';
import { CourseModule } from './course/course.module';
import { CustomerModule } from './customer/customer.module';
import { ModuleModule } from './module/module.module';
import { QuestionModule } from './question/question.module';
import { getEnvFilePath } from './shared/helpers';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFilePath(),
      load: [configuration],
    }),
    CourseModule,
    ModuleModule,
    QuestionModule,
    StudentModule,
    CustomerModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
