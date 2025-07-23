import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export interface UserDocument extends User, Document {
	validatePassword(password: string): Promise<boolean>;
}

@Schema({
	timestamps: true,
	versionKey: false,
})
export class User {
	@Prop({ required: true, trim: true })
	name: string;

	@Prop({ required: true, unique: true, lowercase: true, trim: true })
	email: string;

	@Prop({ required: true, minlength: 6 })
	password: string;

	@Prop({ default: 100 })
	energy: number;

	@Prop({ default: Date.now() + 2 * 60 * 1000 })
	energy_reload_time: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Hash password before saving
UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();
	
	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		next();
	} catch (error) {
		next(error);
	}
});

// Add method to schema
UserSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
	return bcrypt.compare(password, this.password);
};
