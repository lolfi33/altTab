import { PartialType } from '@nestjs/mapped-types';
import { CreateSeatingPlanDto } from './create-seating-plan.dto';

export class UpdateSeatingPlanDto extends PartialType(CreateSeatingPlanDto) {}
