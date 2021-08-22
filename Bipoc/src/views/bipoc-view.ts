// The Grocery List view will provide an api to register
// callbacks for the various user events, like adding
// an item, delete an item, etc.
// This will trigger an update to the model (via the controller)
// the model will then trigger an update of the view (via the controller)
import EventSource from './event-source'
import { EventConstants } from '../common/event-constants'

class MainAppView extends EventSource {
  constructor() {
    super();

    // Add listeners that dispatch user actions events to the observers who have subscribed to these events.
    document.getElementById('button-logout')!.addEventListener('click', () => { this.dispatchEvent(EventConstants.SIGN_OUT, null); });
  }

  // Called by the Controller whenever the View needs to be refreshed
  // because of a Model change.
  updateView() {
  }

  listSelector() {
    let menuToggle: (HTMLElement | null) = document.querySelector('.toggle');
    let navigation: (HTMLElement | null) = document.querySelector('.navigation');
    menuToggle!.onclick = function () {
      menuToggle!.classList.toggle('active');
      navigation!.classList.toggle('active');
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

export default MainAppView;