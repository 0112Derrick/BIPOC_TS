// The Grocery List view will provide an api to register
// callbacks for the various user events, like adding
// an item, delete an item, etc.
// This will trigger an update to the model (via the controller)
// the model will then trigger an update of the view (via the controller)
import SyntheticEventEmitter from '../framework/ClientSyntheticEventEmitter.js';
import { EventConstants } from '../constants/EventConstants.js';
import { LANDING_HTML_IDS as $id } from '../constants/HTMLElementIDConstants.js';
import { MemberSignupDataInterface as $MemberSignupDataInterface } from '../member/MemberData.js';

class MissingElementError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Missing HTML Element";
  }
}

/**
 * @class MemberSignUpView
 * 
 * @extends SyntheticEventEmitter to emit local events to the controller(s).
 * 
 * @description
 * Handles everything related to displaying the signup process. Also handles the member sign up interaction with member sign up data.
 * Sends events to the associated controller when some sort of interaction occurs
 * and provides and interface for updating the view.
 */


class MemberSignUpView extends SyntheticEventEmitter {

  //List of HTML Elements that we reference by ID.
  private DOM: HTMLElement[] = [];

  constructor() {
    super();

    //Create HTML element objects using the values from the IDs file and
    //store them in an array for later use.
    for (let elem_id in $id) {
      let elem = document.getElementById($id[elem_id]);
      if (elem) {
        this.DOM[$id[elem_id]] = elem
      } else {
        throw new MissingElementError(`Element id ${$id}: ${$id[elem_id]} not found`);
      }

    }

    this.DOM[$id.LOGIN_FORM].addEventListener('submit', (event) => { event.preventDefault(); this.memberSignUpFormSubmitCallback() })

    // Add listeners that dispatch user actions events to the observers who have subscribed to these events.
    var landingSignup = document.getElementById('landing-signup-btn');
    var landingLogin = document.getElementById('landing-login-btn');
    if (!landingLogin || !landingSignup) {
      console.log("landingSignup or landingLogin are not found in html.");
      return
    }
    // We are only here if landing buttons exist in the html.
    landingSignup.addEventListener('click', () => { this.dispatchEventLocal(EventConstants.SIGN_UP_HOME, null); });
    landingLogin.addEventListener('click', () => { this.dispatchEventLocal(EventConstants.SIGN_IN_MODAL, null); });

  }


  // Called by the Controller whenever the View needs to be refreshed
  // because of a Model change.
  updateView() { }


  /* NEEDS SANITIZATION!  */
  memberSignUpFormSubmitCallback() {
    let formData: $MemberSignupDataInterface = {
      email: this.DOM[$id.MEMBER_SIGNUP_EMAIL],
      username: this.DOM[$id.MEMBER_SIGNUP_USERNAME],
      password: this.DOM[$id.MEMBER_SIGNUP_PASSWORD],
    }
  }

  //Login
  displayLogInModal() {
    const modal = document.getElementById('login-modal');
    const form: (HTMLElement | null) = document.getElementById('login-form');
    const ok_button = document.getElementById('login-ok');
    const cancel_button = document.getElementById('login-cancel');
    if (!modal || !form || !ok_button || !cancel_button) {
      console.log("modal/form/login_ok button/ or cancel button not found in html.");
      return
    }
    // We are only here if modal/form/login_ok button/ or cancel button exist in html.
    modal.style.display = 'block';


    // Snag the form data and pass it to the Controller
    // to create the new Item.
    ok_button.onclick = (event) => {
      const formData = new FormData(form as HTMLFormElement);

      const [[, email], [, password]] = Array.from(formData.entries());

      if (email && password) {
        modal.style.display = 'none';
        this.dispatchEventLocal(EventConstants.SIGN_IN, formData);
      }
    };

    // Just remove the modal if Cancel is clicked.
    cancel_button.onclick = (event) => {
      modal.style.display = 'none';
    };

    // When the user clicks anywhere outside of the modal, close it.
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";

      }
    }
  }

  /* displayErrorMessage(message) {
    const errordialog: (HTMLDialogElement | null) = document.getElementById('error-dialog') as HTMLDialogElement;
    errordialog.innerText = message;
    const button = document.createElement('button');
    button.innerText = "Close";
    button.onclick = function () { errordialog.close() }
    errordialog.appendChild(button);
    errordialog.showModal();

  } */

}
const memberSignUpView = new MemberSignUpView();
export default memberSignUpView;