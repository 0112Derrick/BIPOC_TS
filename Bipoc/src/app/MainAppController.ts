import { Bipoc } from '../models/bipoc-model.js';
import MainAppView from './MainAppView';
import { EventConstants } from '../constants/EventConstants.js';
import { StatusConstants } from '../constants/StatusConstants.js';
import NetworkProxy from '../network/network-proxy.js'
import Observer from '../framework/observer.js'
import mainAppView from './MainAppView';

class MainAppController extends Observer {
  private networkProxy: NetworkProxy;

  constructor() {
    super();

    this.networkProxy = new NetworkProxy();

    // Create a model and view for this Controller to interact with.


    // Creating an observable member list...
    //this.model.list = this.model.watch(this.model.list, this.model);
    //..and observe it from this controller.
    //this.model.attachObserver(this);



    // Activates list tab on view.
    MainAppView.listSelector();

    //Register to be notified of user generated events from the given view.
    this.addEventListener(EventConstants.SIGN_OUT,
      (e) => { this.logOutCallback(e); }, mainAppView);
  }

  //Logout
  async logOutCallback(event) {
    try {
      const result = await NetworkProxy.postJSON('/member/logout', {});
      if (result.status < StatusConstants.REDIRECTION_MESSAGE_BASE) {
        window.location.assign('/');
      }
    }
    catch {
      console.log("Couldn't redirect user.");
    }

  }





  // Observed objects will notify us via this call.
  notify(data) {
    // Pass the list, total cost and total calories off to the View for display.
    super.notify(data);
    mainAppView.updateView();
  }
}

// Instantiate the app when this script is loaded.
const mainControl = new MainAppController();