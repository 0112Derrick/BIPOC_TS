import { Document } from 'mongoose';
import MemberDataInterface from '../MemberData.js';

export interface IMemberDocument extends Document, MemberDataInterface {
  email: string;
  name: string;
  password: string;
  hash: string;
  salt: string
}