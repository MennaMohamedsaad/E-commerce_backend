import { Schema,model } from "mongoose";


const orderSchema= new Schema({

    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'user',                 
        required: true
    },
    products: [{
        productId:{
            type: Schema.Types.ObjectId, 
            ref: 'product',                 
            required: true
        },
        quantity: {
            type:Number,
            required: true,
            min: 1,
        },
        price: {
            type: Schema.Types.ObjectId, 
            ref: 'product',                 
            required: true
        },
        title :{
            type: Schema.Types.ObjectId, 
            ref: 'product',                 
            required: true
        },
        finalPrice:{
            type:Number,
            required: true,
            min: 0,
        }

    }],
    subTotal:{
        type:Number,
        required: true,
        min: 0,

    },
    couponId: {
        type: Schema.Types.ObjectId, 
        ref: 'coupon',                 
        required: true
    },
    paidAmount: {
        type: Number,
        required: true,
        min: 0,
      },
    address: {
        type: String,
        required: true,
      },
    phoneNumber: {
        type: String,
        required: true,
      },
    orderStatus: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending',
      },
    paymentMethod: {
        type: String,
        enum: ['Credit Card', 'Debit Card', 'PayPal', 'Cash on Delivery'],
        required: true,
      },
    cancelledBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: function () {
          return this.orderStatus === 'Cancelled';
        },
      },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    reason: {
        type: String,
        required: function () {
          return this.orderStatus === 'Cancelled';
        },
    }


});


const orderModel=model('order',orderSchema);
export default orderModel;