import couponModel from "../../../db/models/coupon.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { asyncHandler } from "../../../utils/globalErrorHandling.js";
import { AppError } from "../../../utils/classError.js";
import { nanoid } from "nanoid";
import cloudinary from "../../../utils/cloudinary.js";
import slugify from "slugify";



export const createCoupon= asyncHandler(async(req,res,next)=>{
    const{name}=req.body;
    
    const couponExist=await couponModel.findOne({name: name.toLowerCase()})
    if(couponExist){
        return next(new AppError("coupon name must be unique",409))
    }

    if(!req.file){
        return next(new AppError("image is required",404))
    }

    const customId= nanoid(5)
    const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,{
    folder:`Ecommerce1/categories/${customId}`
    })

    const coupon=await couponModel.create({
        name,
        slug:slugify(name,{
            replacement:"_",
            lower:true
        }),
        image:{secure_url,public_id},
        customId,
        addedBy:req.user._id

    })
    
    res.status(200).json({msg:"done",coupon})
}
)



export const updateCoupon= asyncHandler(async(req,res,next)=>{
    const{name}=req.body;
    const{id}=req.params;
    
    const couponExist=await couponModel.findOne({_id:id, addedBy:req.user._id})
    if(!couponExist){
        return next(new AppError("coupon not exist",404))
    }

    if(name){
        if(name.toLowerCase()=== coupon.name){
            return next(new AppError("name should be different",400))
        }
        if(await couponModel.findOne({name:name.toLowerCase()})){
            return next(new AppError("name already exist",400))
        }
        coupon.name=name.toLowerCase()
        coupon.slug=slugify(name,{
            replacement:"-",
            lower:true
        })
    }


    if(req.file){
        await cloudinary.uploader.destroy(coupon.image.public_id)
        const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
           folder:`Ecommerce1/categories/${coupon.customId}`
    })
    coupon.image={secure_url,public_id}
    }

    await coupon.save()
    
 
    return res.status(201).json({msg:"done",coupon})
}
)



export const getCoupon= asyncHandler(async(req,res,next)=>{
    

    const coupon=await categoryModel.find({}).populate([
        {
            path: "category",
            select: "name -_id"
        },
        {
            path: "addedBy",
            select: "name- _id"

        }
    ])


    
    res.status(200).json({msg:"done",category})
}
)