import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { ItemService } from '../item/item.service';
export interface LoginDto {
    email: string;
    password: string;
}
export interface RegisterDto {
    name: string;
    email: string;
    password: string;
}
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly itemService;
    constructor(userService: UserService, jwtService: JwtService, itemService: ItemService);
    validateUser(email: string, password: string): Promise<any>;
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
