import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CourseService } from './course.service';

@Controller('v1/courses')
@ApiTags('courses')
@ApiBearerAuth('access-token')
export class CourseController {
  constructor(private courseService: CourseService) {}
}
