import productModel from "../../../db/models/product.model.js";
import categoryModel from "../../../db/models/category.model.js";
import subCategoryModel from "../../../db/models/subCategory.model.js";
import brandModel from "../../../db/models/brand.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { nanoid } from "nanoid";
import slugify from "slugify";





export const createProduct= async(req,res,next)=>{
        const{title,category,stock,discount,price,subCategory,brand,description}=req.body;
        
       
        const categoryExist=await categoryModel.findOne({_id: category})
        if(!categoryExist){
            return next(new AppError("category not exist",404))
        }
      
        const subCategoryExist=await subCategoryModel.findOne({_id: subCategory})
        if(!subCategoryExist){
            return next(new AppError("subCategory not exist",404))
        }

        const brandExist=await brandModel.findOne({_id: brand})
        if(brandExist){
            return next(new AppError("brand already exist",404))
        }
        
        const productExist=await productModel.findOne({title: title.lowercase()})
        if(productExist){
            return next(new AppError("product already exist",404))
        }

        if(discount){
            const subPrice= price -(price *(discount /100))
        }
        

        if(!req.file){
            return next(new AppError("image is required",404))
        }

        const customId= nanoid(5)
        let arr=[]
        for(const file of req.files.coverImages){
            const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,{
                folder:`Ecommerce1/categories/${categoryExist.customId}/subCategory/${subCategoryExist.customId}`
                })
                arr.push({secure_url,public_id})
        }
        const {secure_url,public_id}= req.file.image[0]


        const product= await productModel.create({
            title,
            slug:slugify(title,{
                lower:true,
                replacement: "_"
            }),
            description,
            price,
            discount,
            subPrice,
            stock,
            category,
            subCategory,
            brand,
            image:{secure_url,public_id},
            coverImages: arr,
            customId,
            createdBy:req.user._id
        })


        res.status(201).json({msg:"done",product})
}


