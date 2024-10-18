import dotenv from "dotenv"; //this will help to have access to the variable from the .env file from any other file
import express from "express";
import dbConnect from "../config/dbConnect.js";
import userRoutes from "../routes/usersRoute.js";
import productsRouter from "../routes/productsRoute.js";
import categoriesRouter from "../routes/categoriesRouter.js";
import { globalErrHandler, notFound } from "../middlewares/globalErrHandler.js";


dotenv.config();

//db Connect
dbConnect();

const app = express();

//pass incoming data by default express is not passing the data into our server, so we need a middleware. 
// in the following line
app.use(express.json());

// A middleware is a function that has access to the request object and the response and we can do some operations before and after.


app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/categories", categoriesRouter);

// err middleware;
app.use(notFound);
app.use(globalErrHandler);


export default app; 