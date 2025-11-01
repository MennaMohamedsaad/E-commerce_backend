
import { generalFields } from "../../../utils/generalFields";


export const signUpValidation ={
    body: joi.object({
        name:joi.string().alphanum().min(3).required(),
        password: generalFields.password.required(),
        email:generalFields.email.required(),
        age:joi.number().min(15).max(100).required()

    }).required(),
    file:generalFields.file().required(),
    headers:generalFields.headers().required()
}




export const signInValidation ={
    body: joi.object({
        password: generalFields.password.required(),
        email:generalFields.email.required(),
        

    })
}

