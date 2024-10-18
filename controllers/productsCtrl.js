import Product from "../model/Product.js";
import asyncHandler from "express-async-handler";

// desc Create new product
// @route POST /api/v1/products
// @access Private/Admin

export const createProductCtrl = asyncHandler (async (req,res) => {
    //the dinamic values we leave out.--> why?

        const { name, dimensions, description, category, sizes, colors, price, totalQty, totalSold, brand, reviews, user } = req.body;


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
            sizes, 
            price, 
            dimensions, 
            colors, 
            totalQty, 
            totalSold, 
            brand,
            reviews,
            user: req.userAuthId, 
        });

        // push the product into category
        // send response
        res.json({
            status:"success",
            product,
        });

});

// desc GET all products
// @route GET /api/v1/products
// @access public

export const getProductsCtrl = asyncHandler(async(req, res)=>{

    console.log(req.query)
    // product Query
    let productQuery = Product.find();

    // Modify query for name search with optional whitespace matching
    if (req.query.name) {
        const searchPattern = req.query.name.split("").join("\\s*");
        productQuery = productQuery.find({
            name: { $regex: searchPattern, $options: "i" },
        });
    }

    if (req.query.category) {
        const searchPattern = req.query.category.split("").join("\\s*");
        productQuery = productQuery.find({
            category: { $regex: searchPattern, $options: "i" },
        });
    }

    if (req.query.brand) {
        const searchPattern = req.query.brand.split("").join("\\s*");
        productQuery = productQuery.find({
            brand: { $regex: searchPattern, $options: "i" },
        });
    } 

    if (req.query.sizes) {
        const searchPattern = req.query.sizes.split("").join("\\s*");
        productQuery = productQuery.find({
            sizes: { $regex: searchPattern, $options: "i" },
        });
    }

    if (req.query.colors) {
        const searchPattern = req.query.colors.split("").join("\\s*");
        productQuery = productQuery.find({
            colors: { $regex: searchPattern, $options: "i" },
        });
    }

// filter by price range
    if (req.query.price) {
        const priceRange = req.query.price.split("-");
        //gte: greater or equal
        //lte: less than or equal to

        productQuery = await productQuery.find({
            price:{$gte: priceRange[0], $lte: priceRange[1]}
        });

    }

    const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    //limit - how many records of data we are going to display
    const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
    //startIdx
    const startIndex = (page - 1) * limit ;
    //endIdx
    const endIndex = page * limit;
    //total
    const total = await Product.countDocuments();

    productQuery = productQuery.skip(startIndex).limit(limit);

    // pagination results
    const pagination = {};
    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }
    if(startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit,
        };
    }

    // Await the query
    const products = await productQuery;

    res.json({
        status:"success",
        message:"Products",
        results: products.length,
        total,
        pagination,
        message: "Products fetched succesfully",
        products
    })

})

// desc GET single product
// @route GET /api/v1/products/:id
// @access public

export const getProductCtrl = asyncHandler(async(req, res)=>{
    console.log(req.params)

    const product = await Product.findById(req.params.id);

    if(!product){
        throw new Error("Product not found")
    } 
    res.json({
        status: "success",
        message: "Product fetched successfully",
        product
    }
    )

});

// desc Update product
// @route GET /api/v1/products/:id/update
// @access Private/Admnin

export const updateProductCtrl = asyncHandler(async(req, res) => {

    const {
        name, 
        description, 
        category, 
        sizes, 
        price, 
        dimensions, 
        colors, 
        totalQty, 
        totalSold, 
        brand,
        reviews,
        user, 
    } = req.body;

    //update

    const product = await Product.findByIdAndUpdate(req.params.id, {
        name, 
        description, 
        category, 
        sizes, 
        price, 
        dimensions, 
        colors, 
        totalQty, 
        totalSold, 
        brand,
        reviews,
        user, 

    },{
        new:true,
    });
    
    res.json({
        status: "success",
        message: "Product updated successfully",
        product
    });

});

// desc Delete product
// @route DELETE /api/v1/products/:id/delete
// @access Private/Admnin

export const deleteProductCtrl = asyncHandler(async(req, res) => {

    const product = await Product.findByIdAndDelete(req.params.id);
    
    res.json({
        status: "success",
        message: "Product deleted successfully"
    });

});