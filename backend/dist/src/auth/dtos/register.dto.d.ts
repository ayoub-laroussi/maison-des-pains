import { UserRole } from '../../users/enums/user-role.enum';
export declare class RegisterDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    role?: UserRole;
}
