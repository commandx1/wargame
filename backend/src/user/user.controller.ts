import { Controller, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('/:userId/reload-energy')
	async reload(@Param('userId') userId: string): Promise<{energy_reload_time: number, energy: number}> {
		return this.userService.reload(userId);
	}
}
