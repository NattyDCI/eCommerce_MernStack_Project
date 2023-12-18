
export const globalErrHandler = (err, req, res, next)=>{
    //stack 
    //message
    const stack = err?.stack;
    const message = err?.message;
    const statusCode = err?.statusCode ? err?.statusCode : 500;

    res.status(statusCode).json({
        stack,
        message,
    });
  
};

//404 handler
// everytime we fall into an error message we are exiting the application, so in order to move on to the next middleware we need to use next.
export const notFound = (req, res, next) => {
    //we are constructing our custom error message
    const err = new Error(`Route ${req.originalUrl} not found`);
    //we pass our message into next
    next(err);
}