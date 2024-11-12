import {
  Controller,
  Get,
  Body,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Media } from './interfaces/Movie.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post(':id/favorites/:mediaId')
  async removeMediaFromFavorites(
    @Param('id') id: string,
    @Param('mediaId') mediaId: string
  ) {
    return this.usersService.removeMediaFromFavorites(id, Number(mediaId));
  }

  @Post(':id/favorites')
  async addMediaToFavorites(@Param('id') id: string, @Body() media: Media) {
    return this.usersService.addMediaToFavorites(id, media);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id/posts')
  async findOneWithPosts(@Param('id') id: string) {
    return this.usersService.findOneWithPosts(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
}
