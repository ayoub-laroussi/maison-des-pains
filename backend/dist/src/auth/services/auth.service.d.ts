import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';
import { UsersService } from '../../users/services/users.service';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    private usersService;
    constructor(userRepository: Repository<User>, jwtService: JwtService, usersService: UsersService);
    register(registerDto: RegisterDto): Promise<User>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    validateUser(userId: string): Promise<User | null>;
    generateToken(user: User): Promise<{
        access_token: string;
    }>;
    refreshToken(token: string): Promise<{
        access_token: string;
    }>;
}
