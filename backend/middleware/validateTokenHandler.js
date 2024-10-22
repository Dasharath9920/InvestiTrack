import expressAsyncHandler  from "express-async-handler";
import jwt from 'jsonwebtoken';

const validateToken = expressAsyncHandler(async(req, res, next) => {
   let token = '';
   const authHead = req.headers.authorization || req.headers.Authorization;
   console.log('authHead: ',authHead);
   if(authHead && authHead.startsWith('Bearer')){
      token = authHead.split(' ')[1];
   }

   if(!token){
      res.status(401).json({success: false, message: 'User is not authorized or token is missing'});
   }

   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if(err){
         res.status(401).json({success: false, message: 'User is not authorized'});
      }
      
      req.user = decoded.user;
      next();
   });
});

export default validateToken;