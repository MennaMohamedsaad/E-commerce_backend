
import { generalFields } from '../../../utils/generalFields';



export const createProduct ={
    body:joi.object({
        title:joi.string().min(3).max(30).required(),
        category:generalFields.id.required(),
        stock:joi.number().min(1).integer().required(),
        discount:joi.number().min(1).max(100),
        price:joi.number().min(1).integer().required(),
        subCategory:generalFields.id.required(),
        brand:generalFields.id.required(),
        description:joi.string()
    }),
    file:joi.object({
        image:joi.array().items(generalFields.file.required()).required(),
        coverImages:joi.array().items(generalFields.file.required()).required()
    }).required(),
    header:generalFiled.headers.required(),
}