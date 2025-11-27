// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common'; // ✅ Add NotFoundException
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Profile)
    private profilesRepository: Repository<Profile>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const profile = this.profilesRepository.create({ name: createUserDto.name });
    const user = this.usersRepository.create({
      email: createUserDto.email,
      password: hashedPassword,
      role: createUserDto.role,
      profile,
    });
    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({
      where: { email },
      relations: ['profile'],
    });
    return user ?? undefined; // ✅ Convert null → undefined
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`); // ✅ Handle null
    }
    return user;
  }

  async updateMfaSecret(userId: number, secret: string) {
    await this.usersRepository.update(userId, { mfaSecret: secret });
  }
}