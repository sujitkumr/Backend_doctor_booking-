import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AvailabilitySlot } from '../doctors/entities/availability-slot.entity';
import { Consultation } from './entities/consultation.entity';
import { Prescription } from './entities/prescription.entity'; // ✅ IMPORT ADDED
import { InjectRedis } from '@nestjs-modules/ioredis'; // ✅
import { Redis } from 'ioredis'; // ✅
import * as crypto from 'crypto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(AvailabilitySlot)
    private slotRepo: Repository<AvailabilitySlot>,
    @InjectRepository(Consultation)
    private consultationRepo: Repository<Consultation>,
    @InjectRedis() private readonly redis: Redis, // ✅
  ) {}

  async bookConsultation(patientId: number, slotId: number, idempotencyKey?: string) {
    if (idempotencyKey) {
      const cached = await this.redis.get(`idemp:${idempotencyKey}`);
      if (cached) return JSON.parse(cached);
    }

    const slot = await this.slotRepo
      .createQueryBuilder('slot')
      .setLock('pessimistic_write')
      .where('slot.id = :id AND slot.isBooked = false', { id: slotId })
      .getOne();

    if (!slot) throw new ConflictException('Slot is not available');

    const consultation = this.consultationRepo.create({
      patientId,
      doctorId: slot.doctorId,
      slotId,
      status: 'scheduled',
    });

    await this.consultationRepo.save(consultation);
    slot.isBooked = true;
    await this.slotRepo.save(slot);

    const result = { consultationId: consultation.id };
    if (idempotencyKey) {
      await this.redis.setex(`idemp:${idempotencyKey}`, 86400, JSON.stringify(result));
    }
    return result;
  }

  createPrescription(consultationId: number, content: string) {
    const key = process.env.ENCRYPTION_KEY;
    if (!key) throw new Error('ENCRYPTION_KEY not set');

    // ✅ Modern encryption with IV
    const algorithm = 'aes-256-cbc';
    const keyBuffer = Buffer.from(key, 'utf8');
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, keyBuffer, iv);
    let encrypted = cipher.update(content, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const encryptedContent = iv.toString('hex') + ':' + encrypted;

    const prescription = new Prescription(); // ✅ Now recognized
    prescription.consultationId = consultationId;
    prescription.encryptedContent = encryptedContent;
    return prescription;
  }
}