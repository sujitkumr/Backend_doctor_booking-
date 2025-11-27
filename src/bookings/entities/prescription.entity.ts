import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Prescription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  consultationId: number;

  @Column({ type: 'text' })
  encryptedContent: string;
}