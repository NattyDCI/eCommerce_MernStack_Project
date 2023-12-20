// we have to a have a specific route for a specific Model and a specific Controller
import express from "express";
import { registerUserCtrl, loginUserCtrl, getUserProfileCtrl } from "../controllers/usersCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const userRoutes = express.Router();

// http://localhost:7863/api/v1/users
userRoutes.post("/register", registerUserCtrl);
userRoutes.post("/login", loginUserCtrl);
//we can add multiple middlewares before getting to the Controller, in this case
//for adding error handling to protect the route, isLoggedIn is a middleware and getUserProfileCtrl is the controler
userRoutes.get("/profile", isLoggedIn, getUserProfileCtrl);


export default userRoutes;