import MemberDataInterface, { CommonDataInterface } from './MemberData.js';
import AffinityGroup from '../affinity-groups/AffinityGroup.js'
import { EventConstants } from '../constants/EventConstants.js'
import SyntheticEventEmitter from '../framework/SyntheticEventEmitter.js';
import BIPOCElement from '../framework/BIPOCElement.js';

export class Member extends BIPOCElement<MemberDataInterface> {
  protected data: MemberDataInterface;
  protected eventEmitter: (SyntheticEventEmitter | null);

  constructor() {
    super();
    this.data = {
      username: 'username',
      email: 'email@abc123.com',
      firstname: 'firstname',
      lastname: 'lastname',
      address: 'address',
      city: 'city',
      country: 'country',
      zipcode: 'zipcode',
      bio: 'about',
      affinities: [],
      status: 'unknown'
    }
    this.reader = null;
    this.eventEmitter = null;
  }


  /* Returns the current member data.
 */
  getData(this: Member) { return this.data };

  /**
   * Sets the member data.
   */
  setData(this: Member, memberData: MemberDataInterface) {
    //Perform a shallow copy since with know the types match.
    Object.assign(this.data, memberData);
  };

}

const member = new Member();
export default member;

///////////////////////////////////////////////////////////////
type onoff = 'on' | 'off';

type redgreenyellow = 'red' | 'green' | 'yellow'

type driveType = 'go' | 'stop'
class Light {
  state: onoff = 'on';
}

interface redLight<T> {
  red: T
}

interface yellowLight<T> {
  yellow: T
}
interface trafficLightI<T> extends redLight<T>, yellowLight<T> {
  green: T
}
abstract class Street {
  trafficLight: trafficLightI<Light> = {
    red: new Light(),
    green: new Light(),
    yellow: new Light(),
  }
  abstract toggleState(state: redgreenyellow, drive: driveType);

}

class concreteStreet extends Street {
  drive: driveType = 'go';
  toggleState(state: redgreenyellow, drive: driveType) {

    if (state === 'red') {
      this.trafficLight.green.state = 'off';
      this.trafficLight.yellow.state = 'off';
      this.trafficLight.red.state = 'on';

      this.drive = 'stop';
    }

  }

}



interface BaseInterface {
  x: number,
  y: string
}

interface ExtendsBaseInterface extends BaseInterface {
  z: number
}

interface NotRelated {
  c: number
}

interface xyz<T extends BaseInterface> {
  q: T
}

let a: xyz<ExtendsBaseInterface> = {
  q: { x: 1, y: 'hello', z: 3 }
}


abstract class baseClass {
  abstract draw();
}

class concreteClass extends baseClass {
  draw() {
    console.log("concrete class")
  }
}

class cementClass extends baseClass {
  draw() {
    console.log("cement class")
  }

}
function drawClass(x: baseClass) {
  x.draw();
}

let _cement = new cementClass();
let _conrete = new cementClass();

drawClass(_cement);
drawClass(_conrete)