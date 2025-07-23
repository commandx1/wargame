import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<UserDocument | null>;
    validateUser(email: string, password: string): Promise<any>;
    create(userData: Partial<User>): Promise<User>;
    reload(userId: string): Promise<{
        energy_reload_time: number;
        energy: number;
    }>;
}
