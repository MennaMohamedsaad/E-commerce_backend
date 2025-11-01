import { Schema,model } from "mongoose";



const ReviewSchema = new Schema({
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    rate: {
      type: Number,
      required: true,
      min: 1,
      max: 5, 
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
});





const reviewModel=model('review',reviewSchema);
export default reviewModel;