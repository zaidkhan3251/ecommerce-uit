import expressAsyncHandler from "express-async-handler";
// import slugify from 'slugify'
import data from "../data.js";
import User from '../models/userModel.js';
import express from 'express';
import multer from 'multer';
import Product from "../models/productModel.js";
import { isAuth,isAdmin } from '../utils.js';

const productRouter=express.Router();

productRouter.get('/',expressAsyncHandler(async(req,res)=>{
  const category= req.query.category||"" ;
  const seller = req.query.seller || '';
  const categoryFilter= category?{category}:{};
  const sellerFilter = seller ? { seller } : {};

    const products=await Product.find(
      {...categoryFilter,
      ...sellerFilter,}
      )

    res.send(products);
}));



productRouter.get('/seed',expressAsyncHandler(async(req,res)=>{
  await Product.remove({});
    const createdProduct = await Product.insertMany(data.products);
    res.send({createdProduct}) 
}))

productRouter.get('/:id',expressAsyncHandler(async(req,res)=>{
    const product= await Product.findById(req.params.id);
    if(product){
        res.send(product)
    }
    else{
        res.status(404).send({message:'Product Not Found'})
    }
}))


  productRouter.post(
    '/productcreate',
    // upload.single,
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const user= await User.findById(req.user._id);

if(user.isAdmin||user.isSeller){
  const product = new Product({
        name: req.body.name,
        seller: req.user._id,
        image: req.body.image,
        price: req.body.price,
        category: req.body.category,
        brand: req.body.brand,
        countInStock: req.body.countInStock,
        rating: 4.5,
        numReviews: 267,
        description: req.body.description,
      });
      const createdProduct = await product.save();
      res.send({ message: 'Product Created', product: createdProduct });

}
else{res.status(401).send({ message: 'Invalid Admin/Seller Token' });}
      
    })
  );
  productRouter.put(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const user= await User.findById(req.user._id);
if(user.isAdmin||user.isSeller){
      const productId = req.params.id;
      const product = await Product.findById(productId);
      if (product) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.category = req.body.category;
        product.brand = req.body.brand;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;
        const updatedProduct = await product.save();
        res.send({ message: 'Product Updated', product: updatedProduct });
      }
      else {
        res.status(404).send({ message: 'Product Not Found' });
      }
    }
      else{res.status(401).send({ message: 'Invalid Admin/Seller Token' });}

    })
  );
  
  productRouter.delete(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const user= await User.findById(req.user._id);
if(user.isAdmin||user.isSeller){
      const product = await Product.findById(req.params.id);
      if (product) {
        const deleteProduct = await product.remove();
        res.send({ message: 'Product Deleted', product: deleteProduct });
      } else {
        res.status(404).send({ message: 'Product Not Found' });
      }
}
else{res.status(401).send({ message: 'Invalid Admin/Seller Token' });}

    })
  );
  
export default productRouter;