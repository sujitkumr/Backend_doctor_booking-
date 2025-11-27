// src/bookings/bookings.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consultation } from './entities/consultation.entity';
import { Prescription } from './entities/prescription.entity';
import { BookingsController } from './bookings.contoller';
import { BookingsService } from './bookings.service';
import { DoctorsModule } from '../doctors/doctors.module'; // ✅

@Module({
  imports: [
    TypeOrmModule.forFeature([Consultation, Prescription]),
    DoctorsModule,
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}