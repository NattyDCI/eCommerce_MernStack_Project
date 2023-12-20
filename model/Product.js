import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({

        name: {
            type: String, 
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            ref: "Category",
            required: true,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },

        images: [
            {
                type: String,
                default: "https://mnc-img-01.sfo2.cdn.digitaloceanspaces.com/wp-content/uploads/sites/4/2017/08/serenade300x300-150x150@2x.jpg"
            }
        ],

        reviews: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        }],

        price: {
            type: Number,
            required: true,
        },
    
        totalQty: {
            type: Number, 
            required: true,
        },
        totalSold: {
            type: Number,
            required: true,
            default: 0,
        },   
    },
    {
        timestamps: true,
        toJSON: {virtuals: true},
    }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;