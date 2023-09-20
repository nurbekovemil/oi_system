import { PartialType } from '@nestjs/mapped-types';
import { CreateOiKseDto } from './create-oi_kse.dto';

export class UpdateOiKseDto extends PartialType(CreateOiKseDto) {}
