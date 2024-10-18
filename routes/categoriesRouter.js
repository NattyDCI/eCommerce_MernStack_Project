 import express from "express";
import { createCategoryCtrl } from "../controllers/categoryCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const categoriesRouter = express.Router();

categoriesRouter.post("/create", isLoggedIn, createCategoryCtrl)

export default categoriesRouter