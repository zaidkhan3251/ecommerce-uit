import express from 'express';
import data from './data.js';
const app = express();

app.get('/',(req,res)=>{
    res.send("server is ready")
})
app.get('/api/products',(req,res)=>{
    res.send(data.products)
})
app.listen(5000,()=>{
    console.log("server at http://localhost:5000")
})