import { AuthService, LoginDto, RegisterDto } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        items: import("../item/schemas/item.schema").Item[];
        user: {
            id: any;
            name: any;
            email: any;
            energy: any;
            energy_reload_time: any;
        };
    }>;
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
        items: import("../item/schemas/item.schema").Item[];
        user: {
            id: any;
            name: string;
            email: string;
            energy: number;
            energy_reload_time: number;
        };
    }>;
}
