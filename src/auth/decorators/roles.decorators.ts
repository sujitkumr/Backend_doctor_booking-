import { SetMetadata } from '@nestjs/common';
import { ROLES } from '../../common/constants';

export const Roles = (...roles: (keyof typeof ROLES)[]) => SetMetadata('roles', roles);