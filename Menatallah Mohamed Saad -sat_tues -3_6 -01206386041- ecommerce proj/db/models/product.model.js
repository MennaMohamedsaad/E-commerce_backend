import { Schema,model } from "mongoose";



const productSchema=new Schema({
  title: {
    type: String,
    unique:true,
    required: true,
    lowercase:true,
    trim:true,
    minLenght:3,
    maxLenght:30
  },
  description: {
    type: String,
    trim:true,
    minLenght:3,
    unique:true
  },
  slug: {
    type: String,
    unique:true,
    trim:true,
    minLenght:3,
    maxLenght:60
  },
  coverImages: [{
    secure_url: String,
    public_id: String
  }],
  image: {
    secure_url: String,
    public_id: String
  } ,
  createdBy: {
    type: Schema.Types.ObjectId, 
    ref: 'user',                 
    required: true
  },
  category: {
    type: Schema.Types.ObjectId, 
    ref: 'category',
    required: true
  },
  subCategory: {
    type: Schema.Types.ObjectId, 
    ref: 'subCategory',
    
  },
  brand: {
    type: Schema.Types.ObjectId, 
    ref: 'brand',
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 1 
  },
  discount: {
    type: Number,
    default: 0, 
    min: 0,
    max: 100
  },
  subPrice: {
    type: Number,
    default: 1
  },
  stock: {
    type: Number,
    required: true, 
    default: 1
  },
  avgRating: {
    type: Number,
    default: 0
  },
});

const productModel=model('product',productSchema);
export default productModel;