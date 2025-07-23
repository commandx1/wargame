import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id).lean().exec();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.findByEmail(email);
    if (user && (await user.validatePassword(password))) {
      const { password: _, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async create(userData: Partial<User>): Promise<User> {
    const createdUser = new this.userModel(userData);
    return createdUser.save();
  }

  async reload(userId: string): Promise<{ energy_reload_time: number, energy: number }> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('Kullanıcı bulunamadı');
    }
    
    // Always increase energy and set new reload time
    user.energy = Math.min(user.energy + 50, 100);
    user.energy_reload_time = Date.now() + (30 * 1000); // 30 seconds from now
    await user.save();
    
    return { energy_reload_time: user.energy_reload_time, energy: user.energy };
  }
}
