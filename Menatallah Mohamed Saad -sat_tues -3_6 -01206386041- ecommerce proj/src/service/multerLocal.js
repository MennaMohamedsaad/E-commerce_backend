import multer from "multer";
import { nanoid } from "nanoid";
import { AppError } from "../../utils/classError";
import path from "path";
import fs from "fs";

export const validationExtension={
    image:["image/jpg","image/jpeg","image/png"],
    pdf:["application/pdf"],
    video:["video/mp4","video/mkv"]
}


export const multerLocal=(customValidation=["image/png"],customPath="Generals")=>{
   
    const allpath=path.resolve(`uploads/${customPath}`)
        if(!fs.existsSync(allpath)){
            fs.mkdirSync(allpath, {recursive:true})
        }
    const storage =multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,allpath)
        },
        filename:function(req,file,cb){
            cb(null,nanoid(5)+ file.originalname)
        }

    })

    const filefilter= function(req,file,cb){
        if(customValidation.includes(file.mimetype) ){
            return cb (null,true)
        }
        cb(new AppError("file not supported"),false)

    }


    const upload=multer({storage,filefilter})
    return upload;
}




export const multerHost=(customValidation=["image/png"])=>{
   
    
    const storage =multer.diskStorage({})

    const filefilter= function(req,file,cb){
        if(customValidation.includes(file.mimetype) ){
            return cb (null,true)
        }
        cb(new AppError("file not supported"),false)

    }

    
    const upload=multer({storage,filefilter})
    return upload;
}
