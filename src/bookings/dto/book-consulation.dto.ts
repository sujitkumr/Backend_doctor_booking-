import { IsNumber } from 'class-validator';

export class BookConsultationDto {
  @IsNumber()
  slotId: number;
}