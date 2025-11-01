import { Schema,model } from "mongoose";


const subCategorySchema=new Schema({
  name: {
    type: String,
    unique:true,
    required: true
  },
  slug: {
    type: String,
    unique:true
  },
  image: {
    secure_url: {
      type: String,
      required: true
    },
    public_id: {
      type: String,
      required: true,
    }
  },
  addedBy: {
    type: Schema.Types.ObjectId, 
    ref: 'user',                 
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId, 
    ref: 'category'
  }
});

const subCategoryModel=model('subCategory',subCategorySchema);
export default subCategoryModel;