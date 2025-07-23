import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { ItemService } from './item.service';
import { UserService } from 'src/user/user.service';

@Controller('items')
export class ItemController {
  constructor(
    private readonly itemService: ItemService,
    private readonly userService: UserService,
  ) {}

  @Put(':id/progress')
  async updateProgress(
    @Param('id') itemId: string,
    @Body() updateData: { userId: string; percentage: number; energy: number },
  ) {
    return this.itemService.updateProgress(itemId, updateData);
  }

  @Put(':id/level-up')
  async levelUp(@Param('id') itemId: string, @Body('energy') energy: number) {
    return this.itemService.levelUp(itemId, energy);
  }

  @Get()
  async findAll(@Query('userId') userId: string) {
    const [items, user] = await Promise.all([
      this.itemService.findAll(userId),
      this.userService.findOne(userId),
    ]);

    if (user) {
      (user as any).id = (user as any)?._id;
    }

    return { items, user };
  }
}
