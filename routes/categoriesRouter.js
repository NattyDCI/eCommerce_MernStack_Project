 import express from "express";
import { createCategoryCtrl, getAllCategoriesCtrl, getCategoryCtrl, updateCategoryCtrl, deleteCategoryCtrl } from "../controllers/categoryCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const categoriesRouter = express.Router();

categoriesRouter.post("/create", isLoggedIn, createCategoryCtrl);
categoriesRouter.get("/", getAllCategoriesCtrl);
categoriesRouter.get("/:id", getCategoryCtrl);
categoriesRouter.put("/:id", updateCategoryCtrl);
categoriesRouter.delete("/:id/delete", deleteCategoryCtrl);


export default categoriesRouter;