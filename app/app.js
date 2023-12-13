import dotenv from "dotenv"; //this will help to have access to the variable from the .env file from any other file
import express from "express";
import dbConnect from "../config/dbConnect.js";

dotenv.config();

//db Connect
dbConnect();

const app = express();

export default app; 