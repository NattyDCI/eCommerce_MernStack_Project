import dotenv from "dotenv"; //this will help to have access to the variable from the .env file from any other file
import express from "express";
import dbConnect from "../config/dbConnect.js";
import userRoutes from "../routes/usersRoute.js";

dotenv.config();

//db Connect
dbConnect();

const app = express();

// A middleware is a function that has access to the request object and the response and we can do some operations before and after.

//Routes
console.log("Setting up user routes");

app.use("/api/v1/users", userRoutes)

app.use((err,req,res,next) => {
    console.error(error.stack);
    res.status(500).send("something went wrong!")
});


export default app; 