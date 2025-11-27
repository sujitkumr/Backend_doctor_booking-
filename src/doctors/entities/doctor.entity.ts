import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  speciality: string;

  @Column({ nullable: true })
  licenseNo: string;

  @Column({ default: false })
  verified: boolean;
}