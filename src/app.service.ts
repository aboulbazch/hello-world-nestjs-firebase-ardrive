import { Injectable } from '@nestjs/common';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';
import { UserDto } from './dto/user.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectFirebaseAdmin()
    private readonly firebaseAdmin: FirebaseAdmin
  )
  {}

  async getHello(): Promise<UserDto[]> {
    const data = await this.firebaseAdmin.db.collection("Infos").get();
    const users = []
    data.docs.forEach(user => {
      users.push(user.data());
    })
    return users;
  }

  async saveDummyData() {
    const res = await this.firebaseAdmin.db.collection("Infos").doc().set({
      firstName: "Sung",
      lastName: "Jin Woo"
    })
    console.log(res);
    return res;
  }
}
