import { IsEmail, IsString, MinLength, IsEnum } from 'class-validator';
import { ROLES } from '../../common/constants';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  name: string;

  @IsEnum(ROLES)
  role: keyof typeof ROLES;
}