import { AuthService } from '../services/auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    validateToken(): Promise<{
        message: string;
    }>;
}
