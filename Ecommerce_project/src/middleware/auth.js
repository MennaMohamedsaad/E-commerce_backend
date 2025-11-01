import jwt from 'jsonwebtoken';
import router from '../modules/users/user.routes.js';
import { asyncHandler } from '../../utils/globalErrorHandling.js';
import { AppError } from '../../utils/classError.js';

export const auth =()=>{
    return asyncHandler( async(req,res,next)=>{
        const{token}=req.headers;
        if(!token){
            return next(new AppError("token not exist",400))
        }
        if(!token.starswith("mena__")){
            return next(new AppError("token not valid",409))
        }
        const newToken = token.split("mena__")[1]
        if(!newToken){
            return next(new AppError("token not exist",400))
        }
        const decoded=jwt.verify(newToken,"mena")
        if(!decoded?.id){
            return next(new AppError("invalid payload",409))
        }
        const user=await userModel.findById( decoded.id);
        if(!user){
            return next(new AppError("user not found",409))
        }
        if(!roles.includes(user.role)){
            return next(new AppError("tyou are not authorized to access this route",403))
        }
        if(parseInt(user.passwordhangeAt.getTime()/1000) > decoded.iat){
            return next(new AppError("token expired please login again",403))
        }
        req.user=user
        next()

    }
)
}
auth()