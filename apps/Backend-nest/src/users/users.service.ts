import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Media } from './interfaces/Movie.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, updateUserDto);
    return user.save();
  }

  async addMediaToFavorites(userId: string, media: Media): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const mediaExists = user.favorites.some(
      (favorite) => favorite.id === media.id
    );
    if (mediaExists) {
      throw new BadRequestException('Media already in favorites');
    }
    user.favorites.push(media);
    return user.save();
  }

  async removeMediaFromFavorites(
    userId: string,
    mediaId: number
  ): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.favorites = user.favorites.filter((media) => Number(media.id) !== mediaId);
    user.markModified('favorites');
    return user.save();
  }
}
