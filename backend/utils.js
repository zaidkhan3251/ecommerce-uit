import jwt from 'jsonwebtoken';
import User from './models/userModel.js';
export const generateToken=(user)=>{
    return jwt.sign({
        _id: user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
    },
    process.env.JWT_SECRET|| "somethingsecret",
    {
        expiresIn: '30d'
    }
    );
};
export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(
      token,
      process.env.JWT_SECRET || 'somethingsecret',
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Invalid Token' });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  }
  else {
    res.status(401).send({ message: 'No Token' });
  }
};
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};
// export const isSeller = (req, res, next) => {
//   const user= User.findById(req.user.id);

//   if (req.user && user.isSeller) {
//     next();
//   } else {
//     res.status(401).send({ message: 'Invalid Seller Token' });
//   }
// };
// export const isSellerOrAdmin = (req, res, next) => {
//   // const user= await User.findById(req.user.id);
//   if (req.user && (user.isSeller || user.isAdmin)) {
//     console.log("checking=======>>>>" ,user.isSeller)
//     next();
//   } else {  
//     res.status(401).send({ message: 'Invalid Admin/Seller Token' });
//   }
// };