import { Role } from './role.model';
import { Food } from './food.model';

export interface User {
    username: string;
    password: string;
    role?: string;
    email: string;
    mobileNumber: string;
    confirmed?: boolean;
    items?:Array<Food>;
}
export enum RoleName {
    ROLE_USER = 'ROLE_USER',
    ROLE_ADMIN = 'ROLE_ADMIN',
}
