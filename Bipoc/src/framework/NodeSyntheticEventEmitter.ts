import { EventConstants } from '../constants/EventConstants.js'
import SyntheticEventEmitter from './SyntheticEventEmitter.js'

export default class NodeSyntheticEventEmitter extends SyntheticEventEmitter {
  constructor() {
    super()
  }

  dispatchEventLocal(event: EventConstants, data: any) {
    //TBD
  }
}