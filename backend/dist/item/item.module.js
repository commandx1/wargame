"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const item_controller_1 = require("./item.controller");
const item_service_1 = require("./item.service");
const item_schema_1 = require("./schemas/item.schema");
const user_schema_1 = require("../user/schemas/user.schema");
const user_module_1 = require("../user/user.module");
let ItemModule = class ItemModule {
};
exports.ItemModule = ItemModule;
exports.ItemModule = ItemModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: item_schema_1.Item.name, schema: item_schema_1.ItemSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema }
            ]),
            user_module_1.UserModule
        ],
        controllers: [item_controller_1.ItemController],
        providers: [item_service_1.ItemService],
        exports: [item_service_1.ItemService],
    })
], ItemModule);
//# sourceMappingURL=item.module.js.map