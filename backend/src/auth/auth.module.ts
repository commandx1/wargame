import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { ItemModule } from 'src/item/item.module';

@Module({
	imports: [
		UserModule,
		ItemModule,
		PassportModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET || 'warGameSecretKey',
			signOptions: { expiresIn: '7d' },
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
	exports: [AuthService],
})
export class AuthModule {}
