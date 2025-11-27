import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class AvailabilitySlot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  doctorId: number;

  @Column({ type: 'timestamptz' })
  startTime: Date;

  @Column({ type: 'timestamptz' })
  endTime: Date;

  @Column({ default: false })
  isBooked: boolean;
}