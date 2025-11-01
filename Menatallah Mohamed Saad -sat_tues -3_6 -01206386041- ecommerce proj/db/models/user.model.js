
import { Schema,model } from "mongoose";



const userSchema=new Schema({
      name: {
        type: String,
        required: [true,"name is required"],
        minLength:3,
        maxLength:30,
        trim: true
      },
      password: {
        type: String,
        required: [true,"password is required"],
        trim:true
      },
      age: {
         type:Number,
         required: [true,"age is required"]
      },
      coverImage: [{
        secure_url:String,
        public_id:String
      }],
      profile:{
        secure_url:String,
        public_id:String
      } ,
      token: {
        type: String
      },
      email: {
        type:String,
        required:[true,"email is required"],
        unique:true,
        lowercase:true
      },
      phone: [String],
      address: [String],
      confirmed: {
        type: Boolean,
        default: false
      },
      loggedIn: {
        type: Boolean,
        default: false
      },
      role: {
        type: String,
        enum: ["admin" ,"user"],
        default:"user"
      },
      passwordChangeAt: Date
});

const userModel=model('user',userSchema);
export default userModel;