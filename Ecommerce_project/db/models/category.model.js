import { Schema,model } from "mongoose";


const categorySchema=new Schema({
      name: {
        type: String,
        unique:true,
        toLowerCase:true,
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
      customId: String
});


const categoryModel=model('category',categorySchema);
export default categoryModel;