import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './entities/audit-log.entity';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditLog)
    private logRepo: Repository<AuditLog>,
  ) {}

  async log(userId: number, action: string, entity: string, details: any) {
    const log = this.logRepo.create({
      userId,
      action,
      entity,
      details: JSON.stringify(details),
      ip: '127.0.0.1',
    });
    return this.logRepo.save(log);
  }
}