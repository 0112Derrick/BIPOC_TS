import MemberSignUpView from './MemberSignupView.js'
import { LoginStatusConstants } from '../constants/StatusConstants.js'
import { EventConstants } from '../constants/EventConstants.js'
import NetworkProxy from '../network/network-proxy.js'
import Observer from '../framework/observer.js'


class SignUpController extends Observer {
  private networkProxy: NetworkProxy;
  private MemberSignUpView;

  constructor() {
    super();

    this.networkProxy = new NetworkProxy();

    // Create a model and view for this Controller to interact with.

    // Creating an observable member list...
    // this.model.list = this.model.watch(this.model.list, this.model);
    //..and observe it from this controller.
    //this.model.attachObserver(this);



    //Register to be notified of user generated events from the given view.
    this.addEventListener(EventConstants.SIGN_UP_HOME,
      (e) => { this.signUpCallback(e); }, this.MemberSignUpView);
    this.addEventListener(EventConstants.SIGN_IN_MODAL,
      (e) => { this.signInModalCallback(); }, this.MemberSignUpView);

    this.addEventListener(EventConstants.SIGN_IN,
      (e) => { this.logInCallback(e); }, this.MemberSignUpView);

  }

  // Triggered when the user wishes to sign-up.
  signInModalCallback() {
    console.log("Displaying Sign In Modal...")
    this.MemberSignUpView.displayLogInModal();
  }

  // Triggered when user has finished entering sign-up info.
  signUpCallback(event) {
    window.location.assign('/home/signup');
  }

  // Triggered when the user has finished entering sign-in info.
  async logInCallback(event) {

    const entries = event.detail.entries();

    const [[, email], [, password]] = Array.from(entries); //Use array destructuring to extract data from form.
    const result = await NetworkProxy.postJSON('/member/login', { email: email, password: password });

    //Log the user in or report the appropriate error message.
    console.log('result: ', result, LoginStatusConstants.LOGIN_USER_NOT_FOUND)

    if (result && LoginStatusConstants.LOGIN_CLIENT_ERROR_BASE) {
      window.location.assign('/member/main');
    }
    else if (result && result.status < LoginStatusConstants.LOGIN_SERVER_ERROR_BASE) {
      switch (result.status) {
        case LoginStatusConstants.LOGIN_USER_NOT_FOUND:
          this.MemberSignUpView.displayErrorMessage('User Not Found');
          break;
        case LoginStatusConstants.LOGIN_INVALID_PASSWORD:
          this.MemberSignUpView.displayErrorMessage('Invalid Password');
          break;
        default:
          this.MemberSignUpView.displayErrorMessage('Unknown Client Error');
          break;
      }
    }
    else {
      this.MemberSignUpView.displayErrorMessage('Oops. Some unknown server error ');
    }
  }

  // Observed objects will notify us via this call.
  notify(data) {
    // Pass the list, total cost and total calories off to the View for display.
    super.notify(data);
    this.MemberSignUpView.updateView();
  }
}

// Instantiate the app when this script is loaded.
const signUpControl = new SignUpController();