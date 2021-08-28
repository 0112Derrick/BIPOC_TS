import crypto from 'crypto';
import pkg from 'mongoose';
const { Schema, model } = pkg;
export const userSchema = new Schema({
    email: { type: String, index: { unique: true }, required: true },
    dateOfBirth: { type: String, },
    hash: { type: String },
    salt: { type: String },
});
//Add method to compare password
userSchema.method('validPassword', function (password) {
    const recalcHash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
        .toString('hex');
    return this.hash === recalcHash;
});
//Add method to hash password
userSchema.method('hashPassword', function (password) {
    this.salt = crypto.
        randomBytes(16).toString('hex');
    this.hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
        .toString('hex');
});
export const User = model('member', userSchema);
export default User;
