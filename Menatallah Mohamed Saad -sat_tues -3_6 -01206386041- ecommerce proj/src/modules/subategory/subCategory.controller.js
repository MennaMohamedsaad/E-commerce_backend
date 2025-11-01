import subCategoryModel from "../../../db/models/subCategory.model.js";
import categoryModel from "../../../db/models/category.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';




export const createSubCategory= asyncHandler(async(req,res,next)=>{
    const{name}=req.body;
    

    const categoryExist=await categoryModel.findById(req.params.categoryId)
    if(!categoryExist){
        return next(new AppError("category not exist",409))
    }


    const subCategoryExist=await subCategoryModel.findOne({name: name.toLowerCase()})
    if(subCategoryExist){
        return next(new AppError("subCategory already exist",409))
    }

    if(!req.file){
        return next(new AppError("image is required",404))
    }

    const customId= nanoid(5)
    const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,{
    folder:`Ecommerce1/categories/${categoryExist.customId}/subCategory/${customId}`
    })

    const subCategory=await categoryModel.create({
        name,
        slug:slugify(name,{
            replacement:"_",
            lower:true
        }),
        image:{secure_url,public_id},
        customId,
        category: req.params.categoryId,
        addedBy:req.user._id

    })
    
    res.status(200).json({msg:"done",subCategory})
}
)



export const updateSubCategory= asyncHandler(async(req,res,next)=>{
    const{name}=req.body;


    const categoryExist=await categoryModel.findById(category)
    if(!categoryExist){
        return next(new AppError("category not exist",409))
    }


    const subCategoryExist=await subCategoryModel.findOne({name: name.toLowerCase()})
    if(subCategoryExist){
        return next(new AppError("subCategory already exist",409))
    }


    if(name){
        if(name.toLowerCase()=== subCategory.name){
            return next(new AppError("name should be different",400))
        }
        if(await subCategoryModel.findOne({name:name.toLowerCase()})){
            return next(new AppError("name already exist",400))
        }
        subCategory.name=name.toLowerCase()
        subCategory.slug=slugify(name,{
            replacement:"-",
            lower:true
        })
    }


    if(req.file){
        await cloudinary.uploader.destroy(subCategory.image.public_id)
        const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
           folder:`Ecommerce1/categories/${categoryExist.customId}/subCategory/${customId}`
    })
    subCategory.image={secure_url,public_id}
    }

    await subCategory.save()
    
 
    return res.status(201).json({msg:"done",subCategory})
}
)



export const getSubCategory= asyncHandler(async(req,res,next)=>{
    

    const subCategory=await subCategoryModel.find({}).populate([
        {
            path: "category",
            select: "name -_id"
        },
        {
            path: "addedBy",
            select: "name- _id"

        }
    ])


    
    res.status(200).json({msg:"done",subCategory})
}
)