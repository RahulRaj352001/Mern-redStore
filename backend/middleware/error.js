const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  err.statuscode = err.statuscode || 500;
  err.message = err.message || "Internal Server Error";
  
  // wrong mongodb Id error
 if (err.name==="CastError") {
     const message=`Resourses not Found . Invalid:${err.path}`
     err= new ErrorHandler(message,400)
 }
 // monggose duplicate error
 if (err.code===11000) {
    const message=`Duplicate :${Object.keys(err.keyValue)} enter `
    err= new ErrorHandler(message,400) 
 }

//Wrong jwt token
if (err.name =="jsonWebTokenError") {
    const message=`JsonWebToken is invalid !! Try Again `
    err= new ErrorHandler(message,400) 
}

  res.status(err.statuscode).json({
    success: false,
    message: err.message,
  });
};
