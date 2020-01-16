import { Role } from './role.model';

export interface User {
    username: string;
    password: string;
    role?: string;
    email: string;
    mobileNumber: string;
    confirmed?: boolean;
}
export enum RoleName {
    ROLE_USER = 'ROLE_USER',
    ROLE_ADMIN = 'ROLE_ADMIN',
}
