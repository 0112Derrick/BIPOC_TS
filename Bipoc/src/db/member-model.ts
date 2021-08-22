
import crypto from 'crypto';
import { Document, Schema, Model, model } from 'mongoose';

import { IUserDocument } from './interfaces/IUserDocument';

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
  name: { type: String, index: { unique: true }, required: true },
  password: { type: String, required: true },
  hash: { type: String },
  salt: { type: String },
});

//Add method to compare password
userSchema.method('comparePassword', function (password: string): boolean {
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

export const MemberModel = model<IUser, IUserModel>('User', userSchema);

export default MemberModel;
