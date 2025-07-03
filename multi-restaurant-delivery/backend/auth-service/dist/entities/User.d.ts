import 'reflect-metadata';
export declare class User {
    id: number;
    email: string;
    password: string;
    roles: string[];
    hashPassword(): Promise<void>;
    validatePassword(password: string): Promise<boolean>;
}
export {};
