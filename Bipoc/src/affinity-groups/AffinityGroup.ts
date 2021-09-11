export default class AffinityGroup {
  // constructor:  
  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }

  // Used by "JSON.stringify"
  toJSON(key: string) {
    if (key)
      return this.id;
    else
      return this;
  }

  //private:
  private name: string;
  private id: string;
} //AffinityGroup