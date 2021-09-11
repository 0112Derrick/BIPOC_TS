import { Writer, Reader } from '../framework/BIPOCElement.js'
import MemberDataInterface from './MemberData.js';
import NetworkProxy from '../network/network-proxy.js'


export class MemberReader extends Reader<MemberDataInterface> {

  // member properties
  private route: string;

  // constructor
  constructor(route: string) {
    super()
    this.route = route;
  }

  /*...............................................
   Request a member form the server and return
   member data as JSON object.
  ...............................................*/
  async read(): Promise<MemberDataInterface> {

    try {

      let response = await NetworkProxy.postJSON(this.route);

      if (response.ok) {
        const jsonValue = await response.json();
        return Promise.resolve(jsonValue);
      }
      else {
        console.log("Something went wrong reading member")
        return Promise.reject(response);
      }

    }//try

    catch (e) {

      console.log("Something went wrong ", e)
      return Promise.reject(null);

    }//catch

  }// async read()

}// class MemberReader

export class MemberWriter extends Writer<MemberDataInterface> {

  // member properties
  private route: string;

  // constructor
  constructor(route: string) {
    super()
    this.route = route;
  }

  async write(data: MemberDataInterface): Promise<null> {

    try {

      let response = await NetworkProxy.postJSON(this.route, data);

      if (response.ok) {
        return Promise.resolve(null);
      }
      else {
        console.log("Something went wrong reading member ", response.status)
        return Promise.reject(response.status);
      }

    }//try

    catch (e) {

      console.log("Something went wrong writing member ", e)
      return Promise.resolve(null);

    }//catch

  }// async read()

}// class MemberReader