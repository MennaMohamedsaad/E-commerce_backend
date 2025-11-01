
import { Schema,model } from "mongoose";


const couponSchema= new Schema({
    couponCode: {
        type: String,
        required: true,
        unique: true,
        lowercase :true,
        trim:true
      },
      amount: {
        type: Number,
        required: true,
        min: 0,
        max:100
      },
      addedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
      usedBy: [{
       userId: {
         type: Schema.Types.ObjectId,
         ref: 'user',
       }
     }],
     fromDate:{
      type: Date,
      required:true
     },
     toDate:{
      type: Date,
      required:true
     }

});





const couponModel=model('coupon',couponSchema);
export default couponModel;