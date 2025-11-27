// src/doctors/doctors.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { AvailabilitySlot } from './entities/availability-slot.entity';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Doctor, AvailabilitySlot]), // ✅
  ],
  controllers: [DoctorsController],
  providers: [DoctorsService],
  exports: [TypeOrmModule], // ✅ Export so other modules can use its repositories
})
export class DoctorsModule {}