import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from 'nestjs-firebase';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    FirebaseModule.forRoot({
      googleApplicationCredential: process.env.GOOGLE_APPLICATION_CREDENTIALS_FILE,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
