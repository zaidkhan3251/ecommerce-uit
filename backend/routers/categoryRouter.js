import expressAsyncHandler from "express-async-handler";
import express from 'express'
import Category from "../models/categoryModel.js";
import { isAuth,isAdmin } from '../utils.js';


const categoryRouter=express.Router();

categoryRouter.get('/', expressAsyncHandler(async(req,res)=>{
   const categories= await Category.find()
    res.send(categories);
    // console.log('find cat data',req.user);
 }))
categoryRouter.post('/create',
     isAuth,
    isAdmin,
 expressAsyncHandler(async (req, res) =>{
  //  console.log("category data======",req.user)
    const newCat = new Category({
        name: req.body.name,
        image:req.body.image
      })
      await newCat.save()
      res.send({message:"new category added succesfully"})
}))

categoryRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const category = await Category.findById(req.params.id);
      if (category) {
        const deleteCategory = await category.remove();
        res.send({ message: 'Category Deleted', category: deleteCategory });
      } else {
        res.status(404).send({ message: 'Category Not Found' });
      }
    })
  );
  
  categoryRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const category = await Category.findById(req.params.id);
      // console.log(req.body._id,req.params.id,req.body.name,category.name)
      if (category) {
        category.name = req.body.name || category.name;
       
        const updatedCategory = await category.save();
        res.send({ message: "Category Updated", category: updatedCategory });
      } else {
        res.status(404).send({ message: 'Category Not Found' });
      }
    })
  );
  



export default categoryRouter
