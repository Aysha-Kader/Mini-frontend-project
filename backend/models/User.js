import  mongoose from "mongoose";
//usermodel

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type:String,
    enum:["user","admin"],
    default:"user",
  },
  favorites:[
    {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Recipe",
    }
  ]
}, { timestamps: true });

const User=mongoose.model("User",userSchema);
export default User;