import mongoose from "mongoose";

const connectionDB=async()=>{
    return await mongoose.connect(process.env.DB_url)
    .then(()=>{
        console.log("connected database")
    }).catch((err)=>{
        console.log({msg:"faild to connect to database",err})
    })
}


export default connectionDB;