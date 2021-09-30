import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ModuleService } from './module.service';

@Controller('v1/modules')
@ApiTags('modules')
@ApiBearerAuth('access-token')
export class ModuleController {
  constructor(private moduleService: ModuleService) {}
}
