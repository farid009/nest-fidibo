import { Module } from '@prisma/client';
import { Id } from '../../shared/types';

export class ModuleRoDto {
  id!: Id;
  name!: string;
  constructor(module: Module) {
    this.id = module.id;
    this.name = module.name;
  }
}
