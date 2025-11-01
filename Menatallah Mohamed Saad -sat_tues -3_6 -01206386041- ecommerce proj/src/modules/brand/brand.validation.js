
import { generalFields } from "../../../utils/generalFields";


export const createBrand ={
    body: joi.object({
        name:joi.string().min(3).max(30).required(),

    }).required(),
    file:generalFields.file().required(),
    headers:generalFields.headers().required()
}


export const updateBrand={
    body: joi.object({
        name:joi.string().min(3).max(30),

    }).required(),
    file:generalFields.file(),
    headers:generalFields.headers().required()
}
