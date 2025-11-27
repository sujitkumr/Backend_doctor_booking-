import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { Roles } from '../auth/decorators/roles.decorators';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('doctors')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DoctorsController {
  constructor(private doctorsService: DoctorsService) {}

  @Post(':id/availability')
  @Roles('doctor')
  createAvailability(
    @Param('id') doctorId: string,
    @Body() dto: CreateAvailabilityDto,
  ) {
    return this.doctorsService.createAvailability(+doctorId, dto);
  }

  @Get(':id/availability')
  getAvailability(@Param('id') doctorId: string) {
    return this.doctorsService.getAvailability(+doctorId);
  }
}