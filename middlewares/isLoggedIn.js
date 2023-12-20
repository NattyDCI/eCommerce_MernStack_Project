import { getTokenFromHeader } from "../utils/getTokenFromHeader.js"
import { verifyToken } from "../utils/verifyToken.js";

export const isLoggedIn = (req, response, next) => {
    //get token from header
    const token = getTokenFromHeader(req);
    //verify token 
    const decodedUser = verifyToken(token);
    if(!decodedUser){
        throw new Error('Invalid/Expired token, please login again')
    } else {
        //save the user into the req object
        req.userAuthId = decodedUser?.id;
        next();
    }

};