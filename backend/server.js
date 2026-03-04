import express from "express";
import dotenv from "dotenv";

import connectDB from "./db/config.js";


dotenv.config();

connectDB();

const app = express();


app.use(express.json());
app.get("/",(req,res)=>{
    res.send("api running..")
});


app.listen(process.env.PORT, () =>
  console.log("Server running")
);