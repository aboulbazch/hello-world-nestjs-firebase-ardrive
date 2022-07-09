import { Injectable } from '@nestjs/common';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';
import { UserDto } from './dto/user.dto';
import { readJWKFile, arDriveFactory, ArFSResult, ArDrive, Wallet, CreatePublicDriveParams } from 'ardrive-core-js';
import { wrapFileOrFolder, EID } from 'ardrive-core-js';
import { getStorage } from 'firebase-admin/storage';



@Injectable()
export class AppService {

  private myWallet: Wallet = readJWKFile(process.env.PATH_TO_WALLET_FILE);
  private arDrive: ArDrive = arDriveFactory({ wallet: this.myWallet });

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

  async createDrive(createPublicDrive: CreatePublicDriveParams): Promise<ArFSResult> {
    return await this.arDrive.createPublicDrive(createPublicDrive);
  }

  async uploadFile(): Promise<ArFSResult> {
    const wrappedEntity = wrapFileOrFolder('./test2');
    const destFolderId = EID("517e37c1-f524-4784-9435-50fc42dd46e9");
    return await this.arDrive.uploadAllEntities({

        entitiesToUpload: [{ wrappedEntity, destFolderId }]
    });
  }

  async uploadFileFromFirebaseToArDrive() {

    const bucket = getStorage().bucket("helloworldnestjs.appspot.com");
    bucket.getFiles()
    .then(data => {
      console.log(data);
    })
    // console.log(storage);
    // /* ******* ARDrive Upload Section ******** */
    // const wrappedEntity = wrapFileOrFolder('./test1');
    // const destFolderId = EID("517e37c1-f524-4784-9435-50fc42dd46e9");
    // return await this.arDrive.uploadAllEntities({

    //     entitiesToUpload: [{ wrappedEntity, destFolderId }]
    // });
  }
}
