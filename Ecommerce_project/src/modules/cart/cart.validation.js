
import { generalFields } from "../../../utils/generalFields";


export const createCart ={
    body: joi.object({
        productId:generalFields.id.required(),
        quantity:joi.nummber().integer().required()

    }).required(),
    headers:generalFields.headers().required()
}




export const deleteCart ={
    body: joi.object({
        productId:generalFields.id.required(),

    }).required(),
    headers:generalFields.headers().required()
}


export const clearCart ={
    headers:generalFields.headers().required()
}