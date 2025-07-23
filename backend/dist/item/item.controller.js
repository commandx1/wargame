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
exports.ItemController = void 0;
const common_1 = require("@nestjs/common");
const item_service_1 = require("./item.service");
const user_service_1 = require("../user/user.service");
let ItemController = class ItemController {
    itemService;
    userService;
    constructor(itemService, userService) {
        this.itemService = itemService;
        this.userService = userService;
    }
    async updateProgress(itemId, updateData) {
        return this.itemService.updateProgress(itemId, updateData);
    }
    async levelUp(itemId) {
        return this.itemService.levelUp(itemId);
    }
    async findAll(userId) {
        const [items, user] = await Promise.all([
            this.itemService.findAll(userId),
            this.userService.findOne(userId),
        ]);
        user.id = user?._id;
        return { items, user };
    }
};
exports.ItemController = ItemController;
__decorate([
    (0, common_1.Put)(':id/progress'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "updateProgress", null);
__decorate([
    (0, common_1.Put)(':id/level-up'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "levelUp", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "findAll", null);
exports.ItemController = ItemController = __decorate([
    (0, common_1.Controller)('items'),
    __metadata("design:paramtypes", [item_service_1.ItemService,
        user_service_1.UserService])
], ItemController);
//# sourceMappingURL=item.controller.js.map