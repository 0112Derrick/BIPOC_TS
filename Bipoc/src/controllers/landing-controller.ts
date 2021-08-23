import { Bipoc } from '/bipoc-model.js'
import MemberSignUpView from '/landing-view.js'
import { EventConstants, LoginStatusConstants } from '/event-constants.js'
import NetworkProxy from '/network-proxy.js'
import Observer from '/observer.js'


class SignUpController extends Observer {
  private networkProxy: NetworkProxy;
  private model: Bipoc;
  private view: MemberSignUpView;

  constructor() {
    super();

    this.networkProxy = new NetworkProxy();

    // Create a model and view for this Controller to interact with.
    this.model = new Bipoc();

    // Creating an observable member list...
    // this.model.list = this.model.watch(this.model.list, this.model);
    //..and observe it from this controller.
    //this.model.attachObserver(this);

    this.view = new MemberSignUpView();

    //Register to be notified of user generated events from the given view.
    this.addEventListener(EventConstants.SIGN_UP_HOME,
      (e) => { this.signUpCallback(e); }, this.view);
    this.addEventListener(EventConstants.SIGN_IN_MODAL,
      (e) => { this.signInModalCallback(); }, this.view);

    this.addEventListener(EventConstants.SIGN_IN,
      (e) => { this.logInCallback(e); }, this.view);

  }

  // Triggered when the user wishes to sign-up.
  signInModalCallback() {
    console.log("Displaying Sign In Modal...")
    this.view.displayLogInModal();
  }

  // Triggered when user has finished entering sign-up info.
  signUpCallback(event) {
    window.location.assign('/home/signup');
  }

  // Triggered when the user has finished entering sign-in info.
  async logInCallback(event) {

    const entries = event.detail.entries();
    const [[, email], [, password]] = Array.from(entries); //Use array destructuring to extract data from form.
    const result = await this.networkProxy.postJSON('/member/login', { email: email, password: password });

    //Log the user in or report the appropriate error message.
    console.log('result: ', result, LoginStatusConstants.LOGIN_USER_NOT_FOUND)
    if (result < LoginStatusConstants.LOGIN_CLIENT_ERROR_BASE) {
      window.location.assign('/main');
    }
    else if (result < LoginStatusConstants.LOGIN_SERVER_ERROR_BASE) {
      switch (result) {
        case LoginStatusConstants.LOGIN_USER_NOT_FOUND:
          this.view.displayErrorMessage('User Not Found');
          break;
        case LoginStatusConstants.LOGIN_INVALID_PASSWORD:
          this.view.displayErrorMessage('Invalid Password');
          break;
        default:
          this.view.displayErrorMessage('Unknown Client Error');
          break;
      }
    }
    else {
      this.view.displayErrorMessage('Oops. Some unknown server error ');
    }
  }

  // Observed objects will notify us via this call.
  notify(data) {
    // Pass the list, total cost and total calories off to the View for display.
    super.notify(data);
    this.view.updateView();
  }
}

// Instantiate the app when this script is loaded.
const signUpControl = new SignUpController();