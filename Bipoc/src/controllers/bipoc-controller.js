import { Bipoc } from 'bipoc-model.js';
import MainAppView from 'bipoc-view.js';
import { EventConstants } from 'event-constants.js';
import NetworkProxy from 'network-proxy.js';
import Observer from 'observer.js';
class MainAppController extends Observer {
    networkProxy;
    model;
    view;
    constructor() {
        super();
        this.networkProxy = new NetworkProxy();
        // Create a model and view for this Controller to interact with.
        this.model = new Bipoc();
        // Creating an observable member list...
        //this.model.list = this.model.watch(this.model.list, this.model);
        //..and observe it from this controller.
        //this.model.attachObserver(this);
        this.view = new MainAppView();
        // Activates list tab on view.
        this.view.listSelector();
        //Register to be notified of user generated events from the given view.
        this.addEventListener(EventConstants.SIGN_OUT, (e) => { this.logOutCallback(e); }, this.view);
    }
    //Logout
    async logOutCallback(event) {
        const result = await this.networkProxy.postJSON('/member/logout', {});
        if (result < 300) {
            window.location.assign('/');
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
const mainControl = new MainAppController();
