const User=require('../models/user.js');
const _ = require('lodash');
const utilError = require("../config/errorHelper");
module.exports = {createUser,updateUser};

async function createUser(req, res, next) {
  const fields = [
    'firstName',
    'lastName',
    'role',
    'nickname',
    'createdAt',
    'numberOfArticles'
  ];
  const body = req.body;
  const newUser = _.pick(body, fields);
  try {
    const existingUser = await User.findOne({nickname: body.nickname})
    if (existingUser) {
        throw utilError.badRequest('User exists');
    }
    const book = new User(newUser);
    await book.save();
    return res.status(201).json(book);
  } catch (err) {
      console.log(err);
      next(err);
  }

}

async function updateUser(req, res, next) {
  const body = req.body;

  try {
      const existingUser = await User.findOne({_id:req.params.userId})
      if (!existingUser) {
          throw utilError.badRequest('User not exists');
      }
      if(body.firstName){
        existingUser.firstName=body.firstName
      }
      if(body.lastName){
        existingUser.lastName=body.lastName
      }
      if (body.role) {
        existingUser.role = body.role;
      }
      if (body.nickname) {
        existingUser.nickname = body.nickname;
      }
      if(body.numberOfArticles){
        existingUser.numberOfArticles = body.numberOfArticles;
      }

      await existingUser.save();
      return res.status(200).json(existingUser);
  } catch (err) {
      console.log(err);
      next(err);
  }
}