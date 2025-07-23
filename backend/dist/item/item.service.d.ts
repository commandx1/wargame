import { Model } from 'mongoose';
import { Item, ItemDocument } from './schemas/item.schema';
import { UserDocument } from '../user/schemas/user.schema';
export declare class ItemService {
    private itemModel;
    private userModel;
    constructor(itemModel: Model<ItemDocument>, userModel: Model<UserDocument>);
    findByUserId(userId: string): Promise<Item[]>;
    createDefaultItems(userId: string): Promise<Item[]>;
    updateProgress(itemId: string, updateData: {
        userId: string;
        percentage: number;
        energy: number;
    }): Promise<{
        item: Item;
        energy: number;
    }>;
    findAll(userId: string): Promise<Item[]>;
    progress(itemId: string, percentage: number): Promise<Item | null>;
    levelUp(itemId: string): Promise<{
        item: Item;
    }>;
}
