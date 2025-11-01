import brandModel from "../../../db/models/brand.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { asyncHandler } from "../../../utils/globalErrorHandling.js";
import { AppError } from "../../../utils/classError.js";
import { nanoid } from "nanoid";
import cloudinary from "../../../utils/cloudinary.js";
import slugify from "slugify";



export const createBrand= asyncHandler(async(req,res,next)=>{
    const{name}=req.body;
    
    const brandExist=await brandModel.findOne({name: name.toLowerCase()})
    if(brandExist){
        return next(new AppError("brand already exist",409))
    }

    if(!req.file){
        return next(new AppError("image is required",404))
    }

    const customId= nanoid(5)
    const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,{
    folder:`Ecommerce1/brand/${customId}`
    })

    const brand=await brandModel.create({
        name,
        slug:slugify(name,{
            replacement:"_",
            lower:true
        }),
        image:{secure_url,public_id},
        customId,
        addedBy:req.user._id

    })
    
    res.status(200).json({msg:"done",brand})
}
)



export const updatebrand= asyncHandler(async(req,res,next)=>{
    const{name}=req.body;
    const{id}=req.params;
    
    const brandExist=await brandModel.findOne({_id:id, addedBy:req.user._id})
    if(!brandExist){
        return next(new AppError("brand not exist",404))
    }

    if(name){
        if(name.toLowerCase()=== brand.name){
            return next(new AppError("name should be different",400))
        }
        if(await brandModel.findOne({name:name.toLowerCase()})){
            return next(new AppError("name already exist",400))
        }
        brand.name=name.toLowerCase()
        brand.slug=slugify(name,{
            replacement:"-",
            lower:true
        })
    }


    if(req.file){
        await cloudinary.uploader.destroy(brand.image.public_id)
        const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
           folder:`Ecommerce1/brand/${brand.customId}`
    })
    brand.image={secure_url,public_id}
    }

    await brand.save()
    
 
    return res.status(201).json({msg:"done",brand})
}
)