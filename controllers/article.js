const Article=require('../models/article.js');
const User=require('../models/user.js');
const _ = require('lodash');
const utilError = require("../config/errorHelper");

async function createArticle(req, res, next) {
    try {
      const existingUser = await User.findOne({_id:req.body.owner})
      if (!existingUser) {
          throw utilError.badRequest('Owner is not exists');
      }
      const book = new Article(req.body);
      await book.save();
      existingUser.numberOfArticles+=1;
      existingUser.save();
      return res.status(201).json(book.populate('owner'));
    } catch (err) {
        console.log(err);
        next(err);
    }
}

async function updateArticle(req,res,next){
    try {
        const existingArticle=await Article.findOne({_id:req.params.articleId})
        if (!existingArticle) {
            throw utilError.badRequest('Article is not exists');
        }
        const existingUser = await User.findOne({_id:existingArticle.owner})
        if (!existingUser) {
            throw utilError.badRequest('Owner is not exists');
        }
        if (req.body.title) {
            existingArticle.title = req.body.title;
        }
        if (req.body.description) {
            existingArticle.description = req.body.description;
        }
        if(req.body.subtitle){
            existingArticle.subtitle = req.body.subtitle;
        }
        if(req.body.category){
            existingArticle.category = req.body.category;
        }
        await existingArticle.save();
        return res.status(200).end(existingArticle+'\nOwner:\n'+existingUser);
      } catch (err) {
          console.log(err);
          next(err);
      }
}

async function getListOfArticles(req,res,next){
    try {
        let existingArticle;
        console.log(req.query);
        if (req.query.title) {
            existingArticle=await Article.find({title:req.query.title}).populate('owner')
        }
        if (req.query.subtitle) {
            existingArticle=await Article.find({subtitle:req.query.subtitle}).populate('owner')
        }
        if(req.query.description){
            existingArticle=await Article.find({description:req.query.description}).populate('owner')
        }
        if(req.query.owner){
            existingArticle=await Article.find({owner:req.query.owner}).populate('owner')
        }
        if(req.query.category){
            existingArticle=await Article.find({title:req.query.category}).populate('owner')
        }
        if(req.query.createdAt){
            existingArticle=await Article.find({title:req.query.createdAt}).populate('owner')
        }
        if(req.query.updatedAt){
            existingArticle=await Article.find({title:req.query.updatedAt}).populate('owner')
        }
        if(req.query===null||req.query==={}){
            existingArticle=await Article.find().populate('owner')
        }
        return res.status(200).json(existingArticle);
      } catch (err) {
          console.log(err);
          next(err);
      }
}

async function deleteArticle(req,res,next){
    try {
        const existingArticle=await Article.findOne({_id:req.params.articleId})
        if (!existingArticle) {
            throw utilError.badRequest('Article is not exists');
        }
        const existingUser = await User.findOne({_id:existingArticle.owner})
        if (!existingUser) {
            throw utilError.badRequest('Owner is not exists');
        }   
        await Article.deleteOne({ _id: req.params.articleId });
        existingUser.numberOfArticles-=1;
        existingUser.save();
        return res.status(200).end("Deleted");
      } catch (err) {
          console.log(err);
          next(err);
      }
}

module.exports = {createArticle,updateArticle,getListOfArticles,deleteArticle};
