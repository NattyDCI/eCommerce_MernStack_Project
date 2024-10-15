import jwt from "jsonwebtoken";

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_KEY, (err, decoded) =>{
        if(err){
            return "token expired/invalid";
        } else {
            return decoded; // this is the actual user that logged in
        }
    }) 

};