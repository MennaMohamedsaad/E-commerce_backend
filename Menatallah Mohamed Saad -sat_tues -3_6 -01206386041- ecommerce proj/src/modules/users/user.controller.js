
import userModel from "../../../db/models/user.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { asyncHandler } from "../../../utils/globalErrorHandling.js";
import { AppError } from "../../../utils/classError.js";
import { sendEmail } from "../../service/sendEmail.js";
import cloudinary from "../../../utils/cloudinary.js";




export const getUsers= async (req,res,next)=>{
    const users= await userModel.find({})
    res.status(200).json({msg:"done",users})

}


export const signUp= asyncHandler(async(req,res,next)=>{

    const{name,password,email,age,phone,address}=req.body;

  
    const userExist=await userModel.findOne({email})
    if(userExist){
        return next (new AppError("user name must be unique",409))
    }


    const token=jwt.sign({email},process.env.signatureKey,{expiresIn:"1d"})
    const link= `${req.protocol}://${req.headers.host}/users/verifyEmail/${token}`


    const reftoken=jwt.sign({email},process.env.signatureKeyRefresh)
    const reflink= `${req.protocol}://${req.headers.host}/users/refreshToken/${reftoken}`


    const checkSendEmail= await sendEmail(email,"verify your email",`<a herf="${link}">click here</a> <br>
        <a herf="${reflink}">click here to resend link</a>`)
    if(!checkSendEmail){
        return next(new AppError("email not send",400))
    }


    const hash=bcrypt.hashSync(password,+process.env.soltRound)

    
    const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
        folder:"home/profile"
    })
     

    const user=new userModel.create({
        name,
        email,
        password:hash,
        age,
        phone,
        address,
        profile:{secure_url,public_id}  
    })
    const newUser=await user.save()


     
    user= null
    if(!user){
        await cloudinary.api.destroy(user.image.public_id)
        return next(new AppError("user not created please try again later",400))
    }


    newUser? res.status(200).json({msg:"done",user:newUser}): next (new AppError("user not created",500))

})


export const verifyEmail= asyncHandler(async(req,res,next)=>{

    const{token}=req.params;
    const decoded=jwt.verify(token,process.env.signatureKey)
    if(!decoded?.email){
        return next(new AppError("invalid token ",400))
    }
    const user=await userModel.findOneAndUpdate({email: decoded.email, confirmed:false},{confirmed:true});

    user? res.status(200).json({msg:"done"}): next (new AppError("user not exist or already confirmed",400))

})


export const refreshToken=asyncHandler(async(req,res,next)=>{
    const{reftoken}=req.params;
    const decoded=jwt.verify(reftoken,process.env.signatureKeyRefresh)
    if(!decoded?.email){
        return next(new AppError("invalid token ",400))
    }
    const user=await userModel.findOne({email: decoded.email, confirmed:true});
    if(user){
        return next (new AppError("user already confirmed",400))
    }

    const token=jwt.sign({email: decoded.email},process.env.signatureKey,{expiresIn:"1d"})
    const link= `${req.protocol}://${req.headers.host}/users/verifyEmail/${token}`

    await sendEmail(email,"verify your email",`<a herf="${link}">click here</a> <br>`)

    res.status(200).json({msg:"done"})

})


export const signIn=asyncHandler(async(req,res,next)=>{
    const{email,password}=req.body;

    
    const user=await userModel.findOne({email:email.toLowerCase(),confirmed:true });
    if(!user || !bcrypt.compareSynce(password,user.password)){
        return next (new AppError("user not exist or password incorrect ",404))
    }

    const token=jwt.sign({role:user.role,email},process.env.signatureKey,{expiresIn:"1d"})
    await userModel.updateOne({email},{loggedIn:true})

    res.status(200).json({msg:"done",token})

})


export const getProfile =asyncHandler(async(req,res,next)=>{

    res.status(200).json({msg:"done",user:req.user})

})



export const updateUser =asyncHandler(async(req,res,next)=>{
    const {name}=req.body 
    
    const user=await userModel.findByIdAndUpdate(token.id, {name}, {new: true})
    if(!user){
        return next (new AppError("user not found",400))
    } 
    res.status(200).json({msg:"done",user:req.user})

})



export const deleteUser =asyncHandler(async(req,res,next)=>{
    const {name}=req.body
    
    const user=await userModel.findByIdAndDelete(token.id, {name}, {new: true})
    if(!user){
        return next (new AppError("user not found",400))
    } 
    res.status(200).json({msg:"done"})

})



export const forgetPassword =async (req,res,next)=>{
    const {email} =req.body
    const user =await userModel.findOne({email: email.toLowerCase()})
    if(!user){
        return res.status(404).json({msg:"user not exist "})
    }

    const code =customAlphabet("123456789",5)
    const newCode= code()

    await sendEmail({email},"code for reset password",`</h1> your code is ${newCode}</h1>`)
    await userModel.updateOne({email},{code:newCode})
    res.status(200).json({msg:"done"})
}



export const resetPassword = asyncHandler(async (req,res,next)=>{
    const {email,code,password} =req.body
    const user =await userModel.findOne({email: email.toLowerCase()})
    if(!user){
        return next (new AppError("invalid code",400))
    }
    if(user.code !== code || code ==""){
        return next (new AppError("invalid code",400))
    }
    const hash= bcrypt.hashSync(password,8)

    await userModel.updateOne({email},{password:hash,code:"",passwordChangeAt: Date.now(),code:""})

    res.status(200).json({msg:"done"})
})