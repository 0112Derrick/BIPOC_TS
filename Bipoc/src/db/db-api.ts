import mongoose from 'mongoose'
import MemberModel from './member-model.js'

async function addMember(userinfo) {

  const newMember = new MemberModel({
    email: userinfo.email,
    dateOfBirth: userinfo.dateOfBirth,
  });

  newMember.hashPassword(userinfo.password);

  // Add the new member to the DB.
  await newMember.save(function (err, newMember) {
    if (err) {
      return console.log(err)
    }
    else {
      return console.log("User Saved")
    }
  });
  return Promise.resolve(newMember);
}
export { addMember };