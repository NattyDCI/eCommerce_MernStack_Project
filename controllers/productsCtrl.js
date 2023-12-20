import Product from "../model/Product.js";
import asyncHandler from "express-async-handler";

// desc Create new product
// @route POST /api/v1/products
// @access Private/Admin

export const createProductCtrl = asyncHandler (async (req,res) => {
        const { name, description, category, user, price, totalQty } = req.body;

        // product exists
        const productExists = await Product.findOne({ name });

        if( productExists ) {
            throw new Error('product exists')
        } 
        // create the product
        const product = await Product.create({
            name, 
            description, 
            category, 
            user: req.userAuthId,
            price, 
            totalQty

        });
        // push the product into category
        res.json({
            status:'success',
            message:'Product created Succesfully',
            product,
        })

});