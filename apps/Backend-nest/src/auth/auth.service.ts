import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignInUserDto } from './dto/signin-user.dto';
import { Password } from '../utils/password';
import { generateJwt, TokenPayload, verifyJwt } from '../utils/jwt';
import { User } from '../users/schemas/user.schema'; // Import User schema
import { Response, Request } from 'express';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async signin(signInUserDto: SignInUserDto, res: Response): Promise<void> {
    Logger.log(signInUserDto);
    const user = await this.userModel
      .findOne({ email: signInUserDto.email })
      .exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Logger.log(user);
    if (await Password.compare(user.password, signInUserDto.password)) {
      const tokenPayload: TokenPayload = {
        id: user.id,
        email: user.email,
        username: user.username,
      };
      const token = generateJwt(tokenPayload);
      res.cookie('jwt', token, { httpOnly: true });
    } else {
      throw new UnauthorizedException('Invalid password');
    }
  }

  async signout(res: Response): Promise<void> {
    res.clearCookie('jwt');
  }

  async currentUser(req: Request): Promise<Omit<User, 'password'>> {
    const token = req.cookies['jwt'];
    if (!token) {
      throw new UnauthorizedException('No token found');
    }
    const payload: TokenPayload = verifyJwt(token);
    const user = await this.userModel
      .findById(payload.id)
      .select('-password')
      .exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
