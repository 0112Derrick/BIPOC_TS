/* 
Copyright 2021, Derrick Williams, All Rights Reserved.
Purpose: To track all BIPOC data & define a Bipoc member, Bipoc employer, Bipoc groups.
Bipoc members may have the ability to interact with other Bipoc members/employers through messages, groups, and events.
Bipoc groups shall have the ability to unite similar interest Bipoc members and allow messaging.
 */


class Bipoc {
  private membersList: Member[];
  private modalCallback;
  constructor() {
    this.membersList = new Array;

  }

  registerModelCallback(modelCallback) {
    this.modalCallback = modelCallback;
  }

  createNewMember(id, email, dateOfBirth) {
    let existingMember = false;
    let newMember = new Member(id, email, dateOfBirth);
    this.membersList.push(newMember);

  }

  updateMemberName(id, firstName, lastName) {
    //
  }

}


class Employer {
  private superId: string;
  private name: string;
  private userName: string;
  private email: string;
  private image: string;
  private phone: string;
  private businessBio: string;
  constructor(superId, name, userName, email, phone, image, businessBio) {
    this.superId = superId;
    this.name = name;
    this.userName = userName;
    this.email = email;
    this.phone = phone;
    this.image = image;
    this.businessBio = businessBio;
  }
  get getsuperId() { return this.superId }
  get getname() { return this.name }
  get getuserName() { return this.userName }
  get getemail() { return this.email }
  get getphone() { return this.phone }
  get getimage() { return this.image }
  get getbusinessBio() { return this.businessBio }

}

/*
Purpose: Create a new user based on the input parameters and add them to the users database.

Inputs: firstName:String  - The first name of the new user.
        lastName :String  - The last name of the new user.
        age      :Number  - The age of the new user.
        email    :String  - The email of the new user.
        superId  :Number  - Tracks the user.
        userName :String  - The name of the user on the website.
        ethnicity:String  - The ethnicity of the user.
        phone    :Number  - The users phone number.
        address  :Number
        gender   :String
        image    :IMG
        employmentInterest:Boolean
        education:Array of files
        interest :String
        skills   :String
        bio      :String
        notify   :Boolean - User has elected to receive notifications.

Preconditions: All parameters have been verified to contain valid data per the requirements of the system.

Returns: None

Side-Effects: An external datastore will asynchronously requested to add the new user to the database. Any exceptions will be propagated through to the caller of this function.*/


class Member {

  private id: number;
  private firstName: string;
  private lastName: string;
  private userName: string;
  private dateOfBirth: string;
  private email: string;
  private ethnicity: string;
  private phone: string;
  private address: string;
  private gender: string;
  private image: string;
  private employmentInterest: string;
  private education: string;
  private interest: string;
  private skills: string;
  private bio: string;
  private notify: boolean;

  constructor(
    id: number,
    email: string,
    dateOfBirth: string,
    firstName: string = '',
    lastName: string = '',
    userName: string = '',
    ethnicity: string = '',
    phone: string = '',
    address: string = '',
    gender: string = '',
    image: string = '',
    employmentInterest: string = '',
    education: string = '',
    interest: string = '',
    skills: string = '',
    bio: string = '',
    notify: boolean = false) {

    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.dateOfBirth = dateOfBirth;
    this.email = email;
    this.ethnicity = ethnicity;
    this.phone = phone;
    this.address = address;
    this.gender = gender;
    this.image = image;
    this.employmentInterest = employmentInterest;
    this.education = education;
    this.interest = interest;
    this.skills = skills;
    this.bio = bio;
    this.notify = notify;

  }

  get getid() { return this.id }
  get getfirstName() { return this.firstName }
  get getlastName() { return this.lastName }
  get getuserName() { return this.userName }
  get getdateOfBirth() { return this.dateOfBirth }
  get getemail() { return this.email }
  get getethnicity() { return this.ethnicity }
  get getphone() { return this.phone }
  get getaddress() { return this.address }
  get getgender() { return this.gender }
  get getimage() { return this.image }
  get getemploymentInterest() { return this.employmentInterest }

  set setuserName(userName) {
    this.userName = userName;
  }
  /* 
  Purpose: Allows the user to create a new Group.
  */
  createGroup(groupName: string, description: string, owner: string) {

    let group: Group = new Group(groupName, description, owner)
  }
}

class Group {
  private groupName: string;
  private description: string;
  private owner: string;
  private groupMembers: Member[];

  constructor(groupName: string, description: string, owner: string) {
    this.groupName = groupName;
    this.description = description;
    this.owner = owner;
    this.groupMembers = [];

  }
  updateMember() {

  }

  addMember(userName, id) {
    //
  }

}

export { Bipoc, Group, Member, Employer }

