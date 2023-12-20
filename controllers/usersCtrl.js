import User from "../model/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";
// @desc Register User
// @route POST / api/v1/users/register
// @access Private/Admin

export const registerUserCtrl = asyncHandler(async(req, res) => {
    const {fullname, email, password} = req.body
     //Check user exists
     const userExists  = await User.findOne({ email });
     if (userExists) {
        //throw 
        throw new Error ('user already exists')
     }
     //hash password
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt)
     //create the user
 
     const user = await User.create({
         fullname,
         email,
         password: hashedPassword,
     });
     
     res.status(201).json({
         status:'success',
         message:'User Registered Succesfully',
         data: user,
     })
 
 });

// @desc Login User
// @route POST /api/v1/users/login
// @access Public

export const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // find the user in db by email only
    const userFound = await User.findOne({
        email
    });
    //in the optional chaining its the same as using userfound.password
    if(userFound && await bcrypt.compare(password, userFound?.password)){
       res.json({
        status:'success',
        msg:'User logged in succesfully!',
        userFound,
        token: generateToken(userFound._id)
       });
    } else {
        throw new Error ("Invalid Login credentials");
    }
});


// @desc get User Profile
// @route POST / api/v1/users/profile
// @access Private


export const getUserProfileCtrl = asyncHandler(async (req,res) => {
    //get token from header
    const token = getTokenFromHeader(req);
    //verifdy token 

    const verified = verifyToken(token);
    console.log(verified);
    console.log(req)
  
    res.json({
        msg:"Welcome Profile Page"
    });
});