import { Writer, Reader } from '../framework/BIPOCElement.js'
import MemberDataInterface from './MemberData.js';

export class MemberWriter extends Writer<MemberDataInterface> {
  private user: any;
  // constructor
  constructor(user: any) {
    super()
    this.user = user;
  }

  /*...............................................
   Request a member form the server and return
   member data as JSON object.
  ...............................................*/
  async write(data: MemberDataInterface): Promise<null> {
    try {
      for (let key in data) {
        this.user[key] = data[key];
      }
      await this.user.save();
      return Promise.resolve(null);
    }
    catch (e) {
      console.log("Error thrown when saving member ", e)
      return Promise.reject(e);
    }

  }// async read()

}// class MemberReader