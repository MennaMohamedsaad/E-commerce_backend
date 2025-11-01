
import noteModel from "../../../db/models/note.model.js"
import { AppError } from "../../../utils/classError.js"


export const getNote= async (req,res,next)=>{
    const notes= await noteModel.find({}).populate([
        {
            path: "userId",
            select:"-password"
        }
    ])
    res.status(200).json({msg:"done",notes})

}



export const getUserNote= async (req,res,next)=>{
    const notes= await noteModel.find({userId:req.user.id})
    res.status(200).json({msg:"done",notes})

}


export const addNote= async (req,res,next)=>{
    const {title,content}=req.body
    const note= await noteModel.create({title,content,userId:req.user.id})
    res.status(200).json({msg:"done",note})

}



export const updateNote= async (req,res,next)=>{
    const {id}=req.params
    const {title}=req.body

    const note= await noteModel.findOneAndUpdate({_id:id, userId:req.user.id},{title},{new:true})
    if(!note){
        return next(new AppError(("note not found or you not authorized",400)))
    }
    res.status(200).json({msg:"done",note})

}


export const deleteNote= async (req,res,next)=>{
    const {id}=req.params

    const note= await noteModel.findOneAndDelete({_id:id, userId:req.user.id},{new:true})
    if(!note){
        return next(new AppError(("note not found or you not authorized",400)))
    }
    res.status(200).json({msg:"done",note})

}