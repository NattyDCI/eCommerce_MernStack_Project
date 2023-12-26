// we have to a have a specific route for a specific Model and a specific Controller
import express from "express";
import { createProductCtrl } from "../controllers/productsCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const productsRouter = express.Router();

// http://localhost:7863/api/v1/products

//we can add multiple middlewares before getting to the Controller, in this case
//for adding error handling to protect the route, isLoggedIn is a middleware and getUserProfileCtrl is the controler
productsRouter.post("/create", isLoggedIn, createProductCtrl);


export default productsRouter;