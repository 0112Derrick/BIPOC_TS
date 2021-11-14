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


  //public:
  /** public interface:
   * @param affinity The affinity group to assign to this member 
  */
  addAffinity(affinity: AffinityGroup) {
    this.data.affinities.push(affinity);
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