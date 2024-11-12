import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [MongooseModule.forRoot(`mongodb://localhost:27017/test`)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    const mongoose = require('mongoose');
    mongoose.set('debug', true);
  }
}
