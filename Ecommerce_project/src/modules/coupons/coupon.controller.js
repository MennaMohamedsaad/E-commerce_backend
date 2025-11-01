import couponModel from "../../../db/models/coupon.model.js";
import { asyncHandler } from "../../../utils/globalErrorHandling.js";
import { AppError } from "../../../utils/classError.js";





export const createCoupon= asyncHandler(async(req,res,next)=>{
    const{couponCode,amount,fromDate,toDate}=req.body;
    
    const couponExist=await couponModel.findOne({couponCode: couponCode.toLowerCase()})
    if(couponExist){
        return next(new AppError("coupon already exist",409))
    }


    const coupon=await couponModel.create({
        couponCode,
        amount,
        fromDate,
        toDate,
        addedBy:req.user._id

    })
    
    res.status(200).json({msg:"done",coupon})
}
)



export const updateCoupon= asyncHandler(async(req,res,next)=>{
    const{couponCode,amount,fromDate,toDate}=req.body;
    const{id}=req.params;
    
    const coupon=await couponModel.findOneAndUpdate(
        {_id:id, addedBy:req.user._id},{
        couponCode,
        amount,
        fromDate,
        toDate
        },
        {
        new:true
        }
    )
    if(!coupon){
        return next(new AppError("coupon not exist",404))
    }


    
 
    return res.status(201).json({msg:"done",coupon})
}
)