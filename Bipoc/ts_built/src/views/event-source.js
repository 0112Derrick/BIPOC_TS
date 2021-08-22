export default class EventSource {
    constructor() {
        this.eventMap = new Map();
    }
    addEventTarget(event, target) {
        if (this.eventMap.has(event)) {
            this.eventMap.set(this.eventMap.get(event).push(target));
        }
        else {
            this.eventMap.set(event, new Array(target));
        }
    }
    dispatchEvent(event, data) {
        const targets = this.eventMap.get(event);
        const eventObj = new CustomEvent(event, { detail: data });
        for (const target of targets) {
            target.dispatchEvent(eventObj);
        }
    }
}
