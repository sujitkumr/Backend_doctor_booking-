import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Consultation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patientId: number;

  @Column()
  doctorId: number;

  @Column()
  slotId: number;

  @Column({ default: 'scheduled' })
  status: 'scheduled' | 'completed' | 'cancelled';

  @Column({ type: 'timestamptz', nullable: true })
  startTime: Date;

  @Column({ type: 'timestamptz', nullable: true })
  endTime: Date;
}