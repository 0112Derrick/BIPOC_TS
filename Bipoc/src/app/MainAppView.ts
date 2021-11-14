// The Grocery List view will provide an api to register
// callbacks for the various user events, like adding
// an item, delete an item, etc.
// This will trigger an update to the model (via the controller)
// the model will then trigger an update of the view (via the controller)
import EventSource from '../views/event-source.js'
import { EventConstants } from '../constants/EventConstants.js'
import SyntheticEventEmmiter from '../framework/ClientSyntheticEventEmitter.js';
import { MemberProfileDataInterface } from '../member/MemberData.js';
import { HTML_IDS } from '../constants/HTMLElementIDConstants.js';

class MissingElementError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Missing HTML Element";
  }
}
class MainAppView extends SyntheticEventEmmiter {
  private username;
  private email;
  private fName;
  private lName;
  private address;
  private city;
  private country;
  private zipcode;
  private bio;

  private html_elements: HTMLElement[] = [];

  constructor() {
    super();
    const LOGOUT = document.getElementById('button-logout');
    this.username = document.getElementById('profileUsername');
    this.email = document.getElementById('profileDOB');
    this.fName = document.getElementById('profileFName');
    this.lName = document.getElementById('profileLName');
    this.address = document.getElementById('userAddress');
    this.city = document.getElementById('userCity');
    this.country = document.getElementById('userCountry');
    this.zipcode = document.getElementById('userZipcode');
    this.bio = document.getElementById('userBio');

    if (!LOGOUT || !this.username || !this.email || !this.fName || !this.lName || !this.address || !this.city || !this.country || !this.zipcode || !this.bio) {
      console.log("missing logout btn");

      throw new MissingElementError(`missing html element `);
      return
    }
    //create html element objects using the values from the html_ids file and
    for (let elem_id in HTML_IDS) {
      let elem = document.getElementById(HTML_IDS[elem_id])
      if (elem)
        this.html_elements[HTML_IDS[elem_id]] = elem;
      else {
        throw new MissingElementError(`Element id ${HTML_IDS}: ${HTML_IDS[elem_id]} not found!`)
      }
    }

    // Add listeners that dispatch user actions events to the observers who have subscribed to these events.
    LOGOUT.addEventListener('click', () => { this.dispatchEventLocal(EventConstants.SIGN_OUT, null); });
  }
  updateProfileView(profileData: MemberProfileDataInterface) {

  }

  saveProfileCallback() {
    let formData: MemberProfileDataInterface = {
      username: this.username.value,
      email: this.email.value,
      firstname: this.fName.value,
      lastname: this.lName.value,
      address: this.address.value,
      city: this.city.value,
      country: this.country.value,
      zipcode: this.zipcode.value,
      bio: this.bio.value
    }

    this.dispatchEventLocal(EventConstants.PROFILE_SAVE, formData);
  }
  // Called by the Controller whenever the View needs to be refreshed
  // because of a Model change.
  updateView() {
  }

  listSelector() {
    let menuToggle: (HTMLElement | null) = document.querySelector('.toggle');
    let navigation: (HTMLElement | null) = document.querySelector('.navigation');
    if (!menuToggle || !navigation) {
      console.log("navigation or menuToggle doesn't exist");
      return
    }// Can't be here unless menuToggle & navigation are true.
    menuToggle.onclick = function () {
      if (!menuToggle || !navigation) {
        console.log("callback of menuToggle or navigation doesn't exist");
        return
      }
      menuToggle.classList.toggle('active');
      navigation.classList.toggle('active');
    }

    let list: (NodeListOf<HTMLElement>) = document.querySelectorAll('.list');
    for (let i of list) {
      i.onclick = function () {
        let j = 0;
        while (j < list.length) {
          list[j++].className = 'list';
        }
        i.className = 'list active';
      }
    }
  }

}
const mainAppView = new MainAppView();
export default mainAppView;