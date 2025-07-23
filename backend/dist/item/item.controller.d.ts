import { ItemService } from './item.service';
import { UserService } from 'src/user/user.service';
export declare class ItemController {
    private readonly itemService;
    private readonly userService;
    constructor(itemService: ItemService, userService: UserService);
    updateProgress(itemId: string, updateData: {
        userId: string;
        percentage: number;
        energy: number;
    }): Promise<{
        item: import("./schemas/item.schema").Item;
        energy: number;
    }>;
    levelUp(itemId: string): Promise<{
        item: import("./schemas/item.schema").Item;
    }>;
    findAll(userId: string): Promise<{
        items: import("./schemas/item.schema").Item[];
        user: import("../user/schemas/user.schema").User | null;
    }>;
}
