import { Controller, Post, Body, UseGuards, Headers, Request } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { Roles } from '../auth/decorators/roles.decorators';
import { RolesGuard } from '../auth/guards/roles.guard';
import { BookConsultationDto } from './dto/book-consulation.dto';
import { BadRequestException } from '@nestjs/common'; // ✅ ADD THIS
@Controller('bookings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  @Post()
  @Roles('patient')
  async book(
    @Request() req,
    @Body() dto: BookConsultationDto,
    @Headers('idempotency-key') idempotencyKey?: string,
  ) {
    if (!idempotencyKey) {
      throw new BadRequestException('Idempotency-Key header is required');
    }
    return this.bookingsService.bookConsultation(req.user.id, dto.slotId, idempotencyKey);
  }
}