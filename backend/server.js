import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routers/userRouter.js";
import dotenv from "dotenv";
import productRouter from "./routers/productRouter.js";
import categoryRouter from "./routers/categoryRouter.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const DB ="mongodb+srv://dbestore:dbestore123@cluster0.yvc0f.mongodb.net/estoredb?retryWrites=true&w=majority"
// const DB ="mongodb+srv://dbestore:dbestore123@cluster0.yvc0f.mongodb.net/estoredb?retryWrites=true&w=majority";
// const DB ="mongodb+srv://testing123:321testing@cluster0.vtdsb.mongodb.net/testingdb?retryWrites=true&w=majority";
// data base user&password
// dbestore 
// dbestore123

mongoose
  .connect(process.env.MONGODB_URL || DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Databased connected"))
  .catch((error) => console.log(error.reason));
app.use(cors("*"));
app.get("/", (req, res) => {
  res.send("server is ready");
});
app.use("/uploads", express.static('uploads'))
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);



app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
const port = 5000;
app.listen(port, () => {
  console.log("server at http://localhost:5000");
});
