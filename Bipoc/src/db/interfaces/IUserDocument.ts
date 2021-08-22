import { Document } from 'mongoose';

export interface IUserDocument extends Document {
  email: string;
  name: string;
  password: string;
  hash: string;
  salt: string
}