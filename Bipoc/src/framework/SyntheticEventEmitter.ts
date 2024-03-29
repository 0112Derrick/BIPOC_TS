import { EventConstants } from "../constants/EventConstants";
import Observer from "./observer";

export default abstract class SyntheticEventEmitter {

  protected eventMap;

  constructor() {
    this.eventMap = new Map();
  }

  //
  addEventTarget(event: EventConstants, target: Observer): void {
    if (this.eventMap.has(event)) {
      this.eventMap.get(event).push(target);
    }
    else {
      this.eventMap.set(event, new Array(target))
    }
  }

  abstract dispatchEventLocal(event: EventConstants, data: any): void;
}