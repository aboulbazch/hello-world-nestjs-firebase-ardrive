import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UserDto } from './dto/user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("login")
  login() {

  }

  @Get("register")
  register() {

  }

  @Get()
  getHelloWorldFirebase() {
    return this.appService.getHello();
  }

  @Post()
  saveHelloWorld() {
    this.appService.saveDummyData();
  }
}
