abstract class EventInterface {
  constructor() { }
  
}

/*

DomEvent extends EventInterface{
  constructor(){
    super();
    }
  sendEvent(){
    
  }

  addEvent(callback){}
  addEventListener("type", callback())
}

----------------------------------------------------------


** method receiving event
  Main eventInterface > concrete events
* (DOM, Server, Network, Internal events, callbacks)

    addEventListener("type", callback)

-----------------------------------------------------------

   abstract class Event{
      constructor(type){
      this.registeredDestinations = [];
      this.type: string = type; 
      }



    method addEvent(callback){
      this.registeredDestinations.push(callback)
    }

    ** method remove listener
      method removeListener(){

      }

 ** method send event
*
    method sendEvent(data){

      for(i of this.registeredDestinations){
        i(data);
      }
    }

  }
*/