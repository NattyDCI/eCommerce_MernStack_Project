import Product from "../model/Product.js";
import asyncHandler from "express-async-handler";

// desc Create new product
// @route POST /api/v1/products
// @access Private/Admin

export const createProductCtrl = asyncHandler (async (req,res) => {
        const { name, description, category, user, price, dimensions, totalQty, totalSold, typeOfProduct } = req.body;


        //name: name of the flower
        //description 
        //category: category of flower - single stem so on.


        // product exists
        const productExists = await Product.findOne({ name });

        if( productExists ) {
            throw new Error("product exists")
        } 
        // create the product
        const product = await Product.create({
            name, 
            description, 
            category, 
            user: req.userAuthId,
            price, 
            dimensions,
            totalQty,
            totalSold,
            typeOfProduct
            
        });
        // push the product into category
        res.json({
            status:"success",
            product,
        });

});

// desc GET all products
// @route GET /api/v1/products
// @access public

export const getProductsCtrl = asyncHandler(async(req, res)=>{
    const products = await Product.find();
    res.json({
        status:"success",
        message:"Products",
        products
    })

})