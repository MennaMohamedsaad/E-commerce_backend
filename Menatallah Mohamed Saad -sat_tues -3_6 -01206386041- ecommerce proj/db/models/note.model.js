
import { Schema ,model} from "mongoose";



export const noteSchema= new Schema({
    title:{
        type:string,
        required:true
    },
    content:{
        type:string,
        required:true
    },
    userId:{
        type: Schema.Types.ObjectId, 
        ref: 'user',                 
        required: true
    }
})


const noteModel=model('note',noteSchema);
export default noteModel;