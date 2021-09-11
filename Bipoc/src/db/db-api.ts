import mongoose from 'mongoose'
import MemberModel from '../member/MemberDBModel.js'
import EmployerModel from './employer-model.js'

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
// Employer
async function addEmployer(userinfo) {

  const newEmployer = new EmployerModel({
    email: userinfo.email,
    dateOfBirth: userinfo.dateOfBirth,
  });

  newEmployer.hashPassword(userinfo.password);

  // Add the new employer to the DB.
  await newEmployer.save(function (err, newEmployer) {
    if (err) {
      return console.log(err)
    }
    else {
      return console.log("User Saved")
    }
  });
  return Promise.resolve(newEmployer);
}



export { addMember, addEmployer };