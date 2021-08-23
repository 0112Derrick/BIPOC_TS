import crypto from 'crypto';
import { Model } from 'mongoose';
import pkg from 'mongoose';
const { Schema, model } = pkg;

import { IUserDocument } from 'interfaces/IUserDocument.js';

// Define the methods interface for a User (will access this)
// Methods apply per document so they are split
export interface IUser extends IUserDocument {
  comparePassword(password: string): boolean;
  hashPassword(password: string): void;
}

// Define the statics interface for the User Model
// Statics apply to the model, so they are split out.
export interface IUserModel extends Model<IUser> {
}

export const userSchema = new Schema<IUser, IUserModel>({
  email: { type: String, index: { unique: true }, required: true },
  dateOfBirth: { type: String, index: { unique: true } },
  hash: { type: String },
  salt: { type: String },
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

export const User = model<IUser, IUserModel>('member', userSchema);

export default User;
