"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const item_schema_1 = require("./schemas/item.schema");
const user_schema_1 = require("../user/schemas/user.schema");
const promises_1 = require("fs/promises");
const path_1 = require("path");
let ItemService = class ItemService {
    itemModel;
    userModel;
    constructor(itemModel, userModel) {
        this.itemModel = itemModel;
        this.userModel = userModel;
    }
    async findByUserId(userId) {
        return this.itemModel.find({ userId: new mongoose_2.Types.ObjectId(userId) }).exec();
    }
    async createDefaultItems(userId) {
        const itemsFromConfig = await (0, promises_1.readFile)((0, path_1.join)(process.cwd(), 'src/config/items.json'), 'utf8');
        const items = JSON.parse(itemsFromConfig).items;
        const firstLevelItems = items
            .filter((item) => item.level === 1)
            .map((item) => ({
            ...item,
            userId: new mongoose_2.Types.ObjectId(userId),
        }));
        const defaultItems = await this.itemModel.insertMany(firstLevelItems);
        return defaultItems;
    }
    async updateProgress(itemId, updateData) {
        const { userId, percentage, energy } = updateData;
        const updatedItem = await this.itemModel
            .findByIdAndUpdate(itemId, { percentage }, { new: true })
            .exec();
        if (!updatedItem) {
            throw new common_1.NotFoundException('Item not found');
        }
        await this.userModel
            .findByIdAndUpdate(userId, { energy }, { new: true })
            .exec();
        return {
            item: updatedItem,
            energy,
        };
    }
    async findAll(userId) {
        return this.itemModel.find({ userId: new mongoose_2.Types.ObjectId(userId) }).exec();
    }
    async progress(itemId, percentage) {
        return this.itemModel
            .findByIdAndUpdate(itemId, { percentage }, { new: true })
            .exec();
    }
    async levelUp(itemId) {
        const currentItem = await this.itemModel.findById(itemId).exec();
        if (!currentItem) {
            throw new common_1.NotFoundException('Item not found');
        }
        let percentage = 0;
        if (currentItem.level === 2) {
            percentage = 100;
        }
        const itemsFromConfig = await (0, promises_1.readFile)((0, path_1.join)(process.cwd(), 'src/config/items.json'), 'utf8');
        const itemsConfig = JSON.parse(itemsFromConfig).items;
        const nextLevelItem = itemsConfig.find((configItem) => configItem.title === currentItem.title &&
            configItem.level === currentItem.level + 1);
        if (!nextLevelItem) {
            throw new common_1.NotFoundException('Next level item not found in config');
        }
        const updatedItem = await this.itemModel
            .findByIdAndUpdate(itemId, {
            level: nextLevelItem.level,
            title: nextLevelItem.title,
            description: nextLevelItem.description,
            name: nextLevelItem.name,
            percentage,
        }, { new: true })
            .exec();
        if (!updatedItem) {
            throw new common_1.NotFoundException('Failed to update item');
        }
        return {
            item: updatedItem,
        };
    }
};
exports.ItemService = ItemService;
exports.ItemService = ItemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(item_schema_1.Item.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ItemService);
//# sourceMappingURL=item.service.js.map