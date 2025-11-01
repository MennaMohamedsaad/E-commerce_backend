import { generalFields } from "../../../utils/generalFields";




export const createSubCategory ={
    body: joi.object({
        name:joi.string().min(3).max(30).required(),
        

    }).required(),
    file:generalFields.file().required(),
    params:joi.object({
        categoryId:generalFields.id.required(),
    }),
    headers:generalFields.headers().required()
}



export const updateSubCategory={
    body: joi.object({
        name:joi.string().min(3).max(30),

    }).required(),
    file:generalFields.file(),
    headers:generalFields.headers().required()
}