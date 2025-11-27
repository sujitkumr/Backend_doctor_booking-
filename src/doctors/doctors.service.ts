import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';
import { AvailabilitySlot } from './entities/availability-slot.entity';
import { CreateAvailabilityDto } from './dto/create-availability.dto';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepo: Repository<Doctor>,
    @InjectRepository(AvailabilitySlot)
    private slotRepo: Repository<AvailabilitySlot>,
  ) {}

  async createAvailability(doctorId: number, dto: CreateAvailabilityDto) {
    const slot = this.slotRepo.create({
      doctorId,
      startTime: new Date(dto.startTime),
      endTime: new Date(dto.endTime),
    });
    return this.slotRepo.save(slot);
  }

  async getAvailability(doctorId: number) {
    return this.slotRepo.find({
      where: { doctorId, isBooked: false },
      order: { startTime: 'ASC' },
    });
  }
}