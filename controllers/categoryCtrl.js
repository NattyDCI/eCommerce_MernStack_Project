import Category from "../model/Category.js";
import asyncHandler from "express-async-handler";

// desc Create new category
// @route POST /api/v1/category/create
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

// desc GET all categories
// @route GET /api/v1/category
// @access Public

export const getAllCategoriesCtrl = asyncHandler(async (req, res) => {
    const categories = await Category.find();
    res.json({
      status: "success",
      message: "Categories fetched successfully",
      categories,
    });
  });
  

// desc GET Single category
// @route GET /api/v1/category/:id
// @access Public

export const getCategoryCtrl = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    
    if(!category) {
        throw new Error("Category not found!")
    }
    
    res.json({
      status: "success",
      message: "Category fetched successfully",
      category,
    });

  });
  

// desc Update Single category
// @route PUT /api/v1/category/:id
// @access Admin/Private

export const updateCategoryCtrl = asyncHandler(async (req, res) => {

    const { name } = req.body;

    //update

    const category = await Category.findByIdAndUpdate(req.params.id, {
        name,
    },
    {
        new:true,
    });

    res.json({
        status: "success",
        message: "category updated successfully",
        category,
      });

  });
  