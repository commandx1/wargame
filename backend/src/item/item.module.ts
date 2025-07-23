import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { Item, ItemSchema } from './schemas/item.schema';
import { User, UserSchema } from '../user/schemas/user.schema';
import { UserModule } from '../user/user.module';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Item.name, schema: ItemSchema },
			{ name: User.name, schema: UserSchema }
		]),
		UserModule
	],
	controllers: [ItemController],
	providers: [ItemService],
	exports: [ItemService],
})
export class ItemModule {}
