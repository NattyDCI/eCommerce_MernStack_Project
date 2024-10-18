import Category from "../model/Category.js";
import asyncHandler from "express-async-handler";

// desc Create new category
// @route POST /api/v1/category
// @access Private/Admin

export const createCategoryCtrl = asyncHandler(async(req,res)=>{
    const { name } = req.body;
    //category exists
const categoryFound = await Category.findOne({ name });
    if (categoryFound){
        throw new Error("Category already exists");
    }
    //create
    const category = await Category.create({
        name: name?.toLowerCase(),
        user: req.userAuthId,
        image: req?.file?.path,
    });
    res.json({
        status:"success",
        message:"Category created successfully",
        category,
    });
})

