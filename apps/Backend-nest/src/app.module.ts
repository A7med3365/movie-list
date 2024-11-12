import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://localhost:27017/test`),
    UsersModule,
    AuthModule,
    PostsModule,
  ],
})
export class AppModule {}
