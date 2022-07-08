const User=require('../models/user.js');
const Article=require('../models/article.js');
const _ = require('lodash');
const utilError = require("../config/errorHelper");

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
      return res.status(200).json(existingUser)
  } catch (err) {
      console.log(err);
      next(err);
  }
}

async function getUser(req,res,next){
  try {
    const existingUser = await User.findOne({_id:req.params.userId})
    if (!existingUser) {
        throw utilError.badRequest('User not exists');
    }
    const existingAticle=await Article.findOne({owner:req.params.userId});
    return res.status(200).end(existingUser+'\nArticles:\n'+existingAticle);
} catch (err) {
    console.log(err);
    next(err);
}
}

async function deleteUser(req,res,next){
  try {
    const existingUser = await User.findOne({_id:req.params.userId})
    if (!existingUser) {
        throw utilError.badRequest('Owner is not exists');
    }
    await User.deleteOne({_id:req.params.userId});
    await Article.deleteMany({ owner: req.params.userId });
    return res.status(200).end("Deleted");
  } catch (err) {
      console.log(err);
      next(err);
  }
}

async function getUsersArticles(req,res,next){
  try {
    const existingUser = await User.findOne({_id:req.params.userId})
    if (!existingUser) {
        throw utilError.badRequest('Owner is not exists');
    }
    const existingArticles= await Article.find({ owner: req.params.userId }).populate('owner');
    return res.status(200).json(existingArticles);
  } catch (err) {
      console.log(err);
      next(err);
  }
}

module.exports = {createUser,updateUser,getUser,deleteUser,getUsersArticles};