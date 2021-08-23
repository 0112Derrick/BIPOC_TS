
import { EventConstants } from '/event-constants.js'
import Observer from '/observer.js'

export default class EventSource {
  public eventMap;
  constructor() {
    this.eventMap = new Map();
  }

  addEventTarget(event: EventConstants, target: Observer) {
    if (this.eventMap.has(event)) {
      this.eventMap.set(this.eventMap.get(event).push(target));
    }
    else {
      this.eventMap.set(event, new Array(target))
    }
  }
  dispatchEvent(event: EventConstants, data: any) {
    const targets = this.eventMap.get(event);
    const eventObj = new CustomEvent(event, { detail: data });
    for (const target of targets) {
      target.dispatchEvent(eventObj);
    }
  }
}