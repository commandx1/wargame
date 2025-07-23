import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema({
	timestamps: true,
	versionKey: false,
})
export class Item {
	@Prop({ required: true, min: 1 })
	level: number;

	@Prop({ required: true, trim: true })
	title: string;

	@Prop({ required: true, trim: true })
	description: string;

	@Prop({ required: true, min: 0, max: 100, default: 0 })
	percentage: number;

	@Prop({ required: true, trim: true })
	name: string;

	@Prop({ required: true, ref: 'User' })
	userId: Types.ObjectId;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
