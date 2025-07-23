import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { ItemService } from '../item/item.service';
import { UserDocument } from 'src/user/schemas/user.schema'

export interface LoginDto {
	email: string;
	password: string;
}

export interface RegisterDto {
	name: string;
	email: string;
	password: string;
}

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly itemService: ItemService,
	) {}

	async validateUser(email: string, password: string): Promise<any> {
		const user = await this.userService.validateUser(email, password);
		if (!user) {
			throw new UnauthorizedException('Geçersiz kullanıcı adı veya şifre');
		}
		return user;
	}

	async login(loginDto: LoginDto) {
		const user = await this.validateUser(loginDto.email, loginDto.password);

    if (user.energy_reload_time && user.energy_reload_time <= Date.now()) {
      await this.userService.reload(user._id);
    }

    const items = await this.itemService.findByUserId(user._id);
		
		const payload = { 
			email: user.email, 
			sub: (user as any)._id || (user as any).id,
			name: user.name 
		};

		return {
			access_token: this.jwtService.sign(payload),
      items,
			user: {
				id: (user as any)._id || (user as any).id,
				name: user.name,
				email: user.email,
				energy: user.energy || 100,
				energy_reload_time: user.energy_reload_time,
			},
		};
	}

	async register(registerDto: RegisterDto) {
		// Check if user already exists
		const existingUser = await this.userService.findByEmail(registerDto.email);
		if (existingUser) {
			throw new UnauthorizedException('Kullanıcı zaten mevcut');
		}

		// Create new user
		const user = await this.userService.create(registerDto) as UserDocument;

    if (!user) {
      throw new UnauthorizedException('Kullanıcı oluşturulamadı');
    }

    const items = await this.itemService.createDefaultItems(user._id as string);

    if (!items) {
      throw new UnauthorizedException('Eşyalar oluşturulamadı');
    }
		
		// Generate JWT token
		const payload = { 
			email: user.email, 
			sub: (user as any)._id || (user as any).id,
			name: user.name 
		};

		return {
			access_token: this.jwtService.sign(payload),
      items: items,
			user: {
				id: (user as any)._id || (user as any).id,
				name: user.name,
				email: user.email,
				energy: user.energy || 100,
				energy_reload_time: user.energy_reload_time,
			},
		};
	}
}
