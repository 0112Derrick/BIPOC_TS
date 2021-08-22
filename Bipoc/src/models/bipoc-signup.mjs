
/*
Purpose
  Base class to provide event dispatching
Interface
  TBD
*/
class eventDispatcher {

  constructor() {
    this.callbackQueue = [];
  }
  dispatchCallbacks() {
    for (let c of this.callbackQueue) {
      c();
    }
  }
  addCallback(callback) {
    this.callbackQueue.push(callback);
  }
}

/*
Purpose
  Top level class for abtracting the entire BIPOC community.
  Composed of the users, groups, employers, etc.
Interface
  TBD
*/
class BipocCommunity {
  constructor(event, groups, admins, calendar, shop) {
    this.users = [];
    this.events = [];
  }

  addUser(user) {
    this.users.push(user);
  }
  addEvent(eventName, date) {
    const _event = {
      id: this.events.length > 0 ? this.events[this.events.length - 1].id + 1 : 1,
      text: eventName,
      time: date
    }
    this.events.push(_event);
  }
  editEventDate(id, updatedDate) {
    this.events = this.events.map((_event) =>
      _event.id === id ? { id: _event.id, text: _event.eventName, time: updatedDate } : _event,
    )
  }
  editEventName(id, updatedName) {
    this.events = this.events.map((_event) =>
      _event.id === id ? { id: _event.id, text: updatedName, time: _event.date } : _event,
    )
  }
  deleteEvent(id) {
    this.events = this.events.filter((_event) => _event.id !== id);
  }

}

/*
Purpose
  Abtracts a BIPOC user.
Interface
  TBD
*/
class User {
  constructor(superId, _name, email, phone, address, image) {
    this.superId = superId;
    this.name = _name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.image = image;
  }
  setName(userName) {
    this.name = userName;

  }
}


/*
Purpose
  Abtracts a BIPOC group.
Interface
  TBD
*/
class Group extends eventDispatcher {
  constructor(_groupName, _description, owner) {
    this.groupName = _groupName;
    this.description = _description
    this.owner = owner;
    this.members = [];
  }

  updateProp(prop, value) {
    this[prop] = value;
    dispatchCallbacks();
  }
  addMember(member) {
    this.members.push(member);
  }
}

/*
Purpose
  Abtracts a BIPOC employer.
Interface
  TBD
*/
class Employer extends User {
  constructor(superId, _name, email, image, phone, businessBio) {
    super(superId, _name, email, image, phone);
    this.businessBio = businessBio;
  }
}

/*
Purpose
  Abtracts a BIPOC member that has been verified.
Interface
  TBD
*/
class VerifiedMember {
  constructor(superId, _name, email, phone, address, image, interest, skills, jobHistory, ethnicity, education, bio) {
    super(superId, _name, email, phone, address, image);
    this.interest = interest;
    this.skills = skills;
    this.jobHistory = jobHistory;
    this.ethnicity = ethnicity;
    this.education = education;
    this.bio = bio;
  }
}
class Model {
  constructor() { }
}

class View {
  constructor() { }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
}

const app = new Controller(new Model(), new View());

