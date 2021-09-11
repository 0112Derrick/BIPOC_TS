import MemberDataInterface from './MemberData.js';
import { Member } from './Member.js';

import crypto from 'crypto';
import { Model } from 'mongoose';
import pkg from 'mongoose';
const { Schema, model } = pkg;

import { IMemberDocument } from './interfaces/IUserDocument.js';

// Define the methods interface for a User (will access this)
// Methods apply per document so they are split
export interface IMemberDoc extends IMemberDocument {
  comparePassword(password: string): boolean;
  hashPassword(password: string): void;
  syncMemberToUser(member: Member | undefined): void;
}

// Define the statics interface for the User Model
// Statics apply to the model, so they are split out.
export interface IMemberModel extends Model<IMemberDoc> {
}

export const userSchema = new Schema<IMemberDoc, IMemberModel>({

  address: { type: String },
  affinities: { type: [String] },
  bio: { type: String },
  city: { type: String },
  country: { type: String },
  dateOfBirth: { type: String, },
  email: { type: String, index: { unique: true }, required: true },
  firstname: { type: String },
  lastname: { type: String },
  hash: { type: String },
  salt: { type: String },
  status: { type: String },
  username: { type: String, unique: true, required: true },
  zipcode: { type: String },
});

//Add method to compare password
userSchema.method('validPassword', function (password: string): boolean {
  const recalcHash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
  return this.hash === recalcHash;
});

//Add method to hash password
userSchema.method('hashPassword', function (password: string): void {
  this.salt = crypto.
    randomBytes(16).toString('hex');
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
});

/**
 * Sync the the given member to the DB document. DB values are copied into Model.
 * @param member - The member object to sync to the user document.
 */
userSchema.method('syncMemberToUser', function (member: Member): void {

  //First convert the mongoose doc to a js object.
  let docAsObject = this.toObject();

  // Store the properties in a local obj... 
  let memberLocal: MemberDataInterface = {
    username: docAsObject.username,
    email: docAsObject.email,
    firstname: docAsObject.firstname,
    lastname: docAsObject.lastname,
    address: docAsObject.address,
    city: docAsObject.city,
    country: docAsObject.country,
    zipcode: docAsObject.zipcode,
    bio: docAsObject.bio,
    affinities: docAsObject.affinities,
    status: docAsObject.status,
  }

  //...and set the Member model properties to this local.
  member.setData(memberLocal);

});

export const MemberModel = model<IMemberDoc, IMemberModel>('member', userSchema);

export default MemberModel;
