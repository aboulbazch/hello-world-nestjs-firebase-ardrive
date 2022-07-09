import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePublicDriveParams } from 'ardrive-core-js';
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

  @Post("createDrive")
  createDrive(@Body() body: CreatePublicDriveParams) {
    return this.appService.createDrive(body).then(data => {
      data.created.forEach(elm => {
        console.log(`id => ${elm.entityId}`);
        console.log(`name => ${elm.entityName}`);
      })
      return data
    });
  }

  @Get("uploadDrive")
  uploadDrive() {
    return this.appService.uploadFile().then(data => {
      // console.log();
      data.created.forEach(elm => {
        console.log(`id => ${elm.entityId}`);
        console.log(`name => ${elm.entityName}`);
      })
      return data
    });
  }

  @Get("firebaseUpload")
  firebaseUpload() {
    return this.appService.uploadFileFromFirebaseToArDrive();
  }

}
