import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from '../auth/decorators/roles.decorators';
import { RolesGuard } from '../auth/guards/roles.guard';


@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post() // ← NO @Roles, NO @UseGuards
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}