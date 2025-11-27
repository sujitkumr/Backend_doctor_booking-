// src/common/constants.ts
export type UserRole = 'patient' | 'doctor' | 'admin';

export const ROLES: Record<UserRole, UserRole> = {
  patient: 'patient',
  doctor: 'doctor',
  admin: 'admin',
} as const;