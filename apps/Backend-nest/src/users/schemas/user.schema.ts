import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Password } from '../../utils/password';
import { Media } from '../interfaces/Movie.interface';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 1 })
  avatarIndex: number;

  @Prop({ default: [] })
  favorites: Media[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    if (this.isModified('favorites')) {
        this.markModified('favorites');
    }
    next();
});
