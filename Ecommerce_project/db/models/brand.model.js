import { Schema,model } from "mongoose";


const brandSchema=new Schema({
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
    secure_url:String,
    public_id: String
  },
  addedBy: {
    type: Schema.Types.ObjectId, 
    ref: 'user',                 
    required: true,
  },
});

const brandModel=model('brand',brandSchema);
export default brandModel;