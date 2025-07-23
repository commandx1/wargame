import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Item, ItemDocument } from './schemas/item.schema';
import { User, UserDocument } from '../user/schemas/user.schema';
import { readFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findByUserId(userId: string): Promise<Item[]> {
    return this.itemModel.find({ userId: new Types.ObjectId(userId) }).exec();
  }

  async createDefaultItems(userId: string): Promise<Item[]> {
    const itemsFromConfig = await readFile(
      join(process.cwd(), 'src/config/items.json'),
      'utf8',
    );
    const items = JSON.parse(itemsFromConfig).items as Item[];
    const firstLevelItems = items
      .filter((item) => item.level === 1)
      .map((item) => ({
        ...item,
        userId: new Types.ObjectId(userId),
      }));

    const defaultItems = await this.itemModel.insertMany(firstLevelItems);
    return defaultItems;
  }

  async updateProgress(
    itemId: string,
    updateData: { userId: string; percentage: number; energy: number },
  ): Promise<{ item: Item; energy: number }> {
    const { userId, percentage, energy } = updateData;

    // Update item percentage
    const updatedItem = await this.itemModel
      .findByIdAndUpdate(itemId, { percentage }, { new: true })
      .exec();

    if (!updatedItem) {
      throw new NotFoundException('Item not found');
    }

    // Update user energy
    await this.userModel
      .findByIdAndUpdate(userId, { energy }, { new: true })
      .exec();

    return {
      item: updatedItem,
      energy,
    };
  }

  async findAll(userId: string): Promise<Item[]> {
    // Check if we have items in database
    return this.itemModel.find({ userId: new Types.ObjectId(userId) }).exec();
  }

  async progress(itemId: string, percentage: number): Promise<Item | null> {
    return this.itemModel
      .findByIdAndUpdate(itemId, { percentage }, { new: true })
      .exec();
  }

  async levelUp(itemId: string): Promise<{ item: Item }> {
    // Get current item
    const currentItem = await this.itemModel.findById(itemId).exec();
    if (!currentItem) {
      throw new NotFoundException('Item not found');
    }

    let percentage = 0;
    // Check if item can level up
    if (currentItem.level === 2) {
      percentage = 100;
    }

    // Load items config
    const itemsFromConfig = await readFile(
      join(process.cwd(), 'src/config/items.json'),
      'utf8',
    );
    const itemsConfig = JSON.parse(itemsFromConfig).items;

    // Find next level item with same title
    const nextLevelItem = itemsConfig.find(
      (configItem: any) =>
        configItem.title === currentItem.title &&
        configItem.level === currentItem.level + 1,
    );

    if (!nextLevelItem) {
      throw new NotFoundException('Next level item not found in config');
    }

    // Update item with next level data
    const updatedItem = await this.itemModel
      .findByIdAndUpdate(
        itemId,
        {
          level: nextLevelItem.level,
          title: nextLevelItem.title,
          description: nextLevelItem.description,
          name: nextLevelItem.name,
          percentage,
        },
        { new: true },
      )
      .exec();

    if (!updatedItem) {
      throw new NotFoundException('Failed to update item');
    }

    return {
      item: updatedItem,
    };
  }
}
