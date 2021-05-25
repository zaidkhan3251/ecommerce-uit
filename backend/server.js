import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
const app = express();
const DB = "mongodb+srv://dbestore:dbestore123@cluster0.yvc0f.mongodb.net/estoredb?retryWrites=true&w=majority"
// data base user&password
// dbestore
// dbestore123

mongoose.connect(process.env.MONGODB_URL || DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(() => console.log("Databased connected"))
.catch(error=>console.log(error.reason,))
app.use(cors("*"))
app.get('/',(req,res)=>{
    res.send("server is ready")
})
app.use('/api/users',userRouter )

app.use('/api/products',productRouter )

app.use((err,req,res,next)=>{
    res.status(500).send({ message : err.message})
    
})
const port= 5000;
app.listen(port,()=>{
    console.log("server at http://localhost:5000")
})