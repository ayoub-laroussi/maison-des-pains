export declare enum UserRole {
    CLIENT = "CLIENT",
    BOULANGER = "BOULANGER",
    ADMIN = "ADMIN"
}
export declare class User {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    role: UserRole;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
