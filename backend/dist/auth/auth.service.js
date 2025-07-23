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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const item_service_1 = require("../item/item.service");
let AuthService = class AuthService {
    userService;
    jwtService;
    itemService;
    constructor(userService, jwtService, itemService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.itemService = itemService;
    }
    async validateUser(email, password) {
        const user = await this.userService.validateUser(email, password);
        if (!user) {
            throw new common_1.UnauthorizedException('Geçersiz kullanıcı adı veya şifre');
        }
        return user;
    }
    async login(loginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (user.energy_reload_time && user.energy_reload_time <= Date.now()) {
            await this.userService.reload(user._id);
        }
        const items = await this.itemService.findByUserId(user._id);
        const payload = {
            email: user.email,
            sub: user._id || user.id,
            name: user.name
        };
        return {
            access_token: this.jwtService.sign(payload),
            items,
            user: {
                id: user._id || user.id,
                name: user.name,
                email: user.email,
                energy: user.energy || 100,
                energy_reload_time: user.energy_reload_time,
            },
        };
    }
    async register(registerDto) {
        const existingUser = await this.userService.findByEmail(registerDto.email);
        if (existingUser) {
            throw new common_1.UnauthorizedException('Kullanıcı zaten mevcut');
        }
        const user = await this.userService.create(registerDto);
        if (!user) {
            throw new common_1.UnauthorizedException('Kullanıcı oluşturulamadı');
        }
        const items = await this.itemService.createDefaultItems(user._id);
        if (!items) {
            throw new common_1.UnauthorizedException('Eşyalar oluşturulamadı');
        }
        const payload = {
            email: user.email,
            sub: user._id || user.id,
            name: user.name
        };
        return {
            access_token: this.jwtService.sign(payload),
            items: items,
            user: {
                id: user._id || user.id,
                name: user.name,
                email: user.email,
                energy: user.energy || 100,
                energy_reload_time: user.energy_reload_time,
            },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        item_service_1.ItemService])
], AuthService);
//# sourceMappingURL=auth.service.js.map