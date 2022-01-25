const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");
// Register a user
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a sample id",
      url: "ProfilePicUrl",
    },
  });
  //   const token = user.getJWTToken();
  //   res.status(201).json({
  //     success: true,
  //     token,
  //   });
  sendToken(user, 201, res);
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("please enter email & password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("please enter email & password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("please enter email & password", 401));
  }
  sendToken(user, 200, res);
});
//Logout
exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "logged Out",
  });
});
//Forget Password

exports.forgetPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = ` your password token is :-\n\n${resetPasswordUrl} \n if thos is not your email, please ignore it`;
  try {
    await sendEmail({
      email: user.email,
      subject: `Ecomerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});
//reset password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  //creating  token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler("reset password token is invalid has been expired", 404)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does  not match", 404));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
});
//user deatil
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});
// user update password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("please enter old password correct", 401));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 401));
  }
  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);
});
//update Profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  // we will add cloaudinary later

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    usefindAndModify: false,
  });
  res.status(200).json({
    success: true,
  });
  //   sendToken(user, 200, res); not necesseary
});

// get all users (admin)

exports.getAllUser= catchAsyncError(async (req,res,next)=>{

    const users= await User.find();
    res.status(200).json({
        success:true,
        users
    })
})
// get single user(admin)
exports.getSingleUser= catchAsyncError(async (req,res,next)=>{

    const user= await User.findById(req.params.id);
    
    if (!user) {
        return next(new ErrorHandler(  `user does not exits with id:${req.params.id}`))
    }

    res.status(200).json({
        success:true,
        user
    })
})

/// update roles -admin
exports.updateRole = catchAsyncError(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role
    };
   
  
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      usefindAndModify: false,
    });
    res.status(200).json({
      success: true,
    });
    
  });
/// delete user-admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const user= await User.findById(req.params.id)

    // we will remove cloudinary
    if (!user) {
        return next(new ErrorHandler(  `user does not exits with id:${req.params.id}`))
    }
  
    await user.remove();

    res.status(200).json({
      success: true,
      message:"user delete sussessfully",
    });
    
  });