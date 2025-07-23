import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    reload(userId: string): Promise<{
        energy_reload_time: number;
        energy: number;
    }>;
}
