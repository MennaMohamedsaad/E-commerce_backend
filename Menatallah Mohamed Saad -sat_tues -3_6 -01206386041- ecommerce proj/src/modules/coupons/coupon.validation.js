
import { generalFields } from "../../../utils/generalFields";


export const createCoupon ={
    body: joi.object({
        couponCode:joi.string,
        amount:joi.nummber().integer().required(),
        fromDate:joi.date().greater(Date.now()).required(),
        toDate:joi.date().greater(joi.ref("fromDate")).required()

    }).required(),
    headers:generalFields.headers().required()
}


export const updateCoupon={
    body: joi.object({
        couponCode:joi.string,
        amount:joi.nummber().integer(),
        fromDate:joi.date().greater(Date.now()),
        toDate:joi.date().greater(joi.ref("fromDate"))

    }),
    headers:generalFields.headers().required()
}
