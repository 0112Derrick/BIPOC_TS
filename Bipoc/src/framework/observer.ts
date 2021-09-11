import { EventConstants } from "EventConstants";
import ClientSyntheticEventEmitter from './ClientSyntheticEventEmitter.js';

export default class Observer extends EventTarget {
  constructor() { super() }

  //Should be overridden by function that handles data change for the Observable.
  notify(data) {
    console.log(`Notified of change to ${data}`);
  }
  addEventListener(event, callback, viewEventSource) {
    // Use "synthic" events to de-couple the controller from the view.
    super.addEventListener(event, callback);//Register the event with the system.
    viewEventSource.addEventTarget(event, this);//Add this controller as the target of the event.
  }
  listenForEvent(event: EventConstants,
    callback: EventListenerOrEventListenerObject | ((evt: CustomEvent) => void),
    eventSource: ClientSyntheticEventEmitter) {

    //Register the event with the system.
    super.addEventListener(event, <EventListenerOrEventListenerObject>callback);

    //Add this event sink to the given source.
    eventSource.addEventTarget(event, this);
  }
}

