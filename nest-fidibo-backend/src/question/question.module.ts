import { Module } from '@nestjs/common';
import { PrismaModule } from '../shared/modules/prisma-management/prisma.module';
import { QuestionController } from './question.controller';
import { questionProviders } from './question.provider';

@Module({
  imports: [PrismaModule],
  providers: questionProviders,
  controllers: [QuestionController],
  exports: questionProviders,
})
export class QuestionModule {}
