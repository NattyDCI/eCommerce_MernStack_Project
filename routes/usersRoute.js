// we have to a have a specific route for a specific Model and a specific Controller
import express from "express";
import { registerUserCtrl, loginUserCtrl, getUserProfileCtrl } from "../controllers/usersCtrl.js";

const userRoutes = express.Router();

// http://localhost:7863/api/v1/users
userRoutes.post("/register", registerUserCtrl);
userRoutes.post("/login", loginUserCtrl);
userRoutes.get("/profile", getUserProfileCtrl);


export default userRoutes;