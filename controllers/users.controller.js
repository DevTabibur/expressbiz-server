const { json } = require("express");
const { ObjectId } = require("mongodb");
const { routes } = require("../app");
const User = require("../Models/users.model");
const userService = require("../services/users.service");
const generateToken = require("../utils/generateToken");

module.exports.getAdmin = async(req, res, next) =>{
  try {
    const { email } = req.params;
    const result = await userService.getAdminService(email);
    res.status(200).json({
      status: "success",
      code: 200,
      message: "successfully getting an Admin",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      code: 400,
      message: "Couldn't get an Admin",
      error: error.message,
    });
  }
}

module.exports.getMe = async (req, res, next) => {
  try {
    // decoded token is  here req.user
    const userExists = await userService.findAUserByMail(req.user?.email);
    res.status(200).json({
      status: "success",
      code: 200,
      message: "successfully load this token verified api",
      data: userExists,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      code: 400,
      message: "Couldn't load this api",
      err: err.message,
    });
  }
};

module.exports.getAllUser = async (req, res, next) => {
  try {
    const result = await userService.getAllUserService();
    if (result.length > 0) {
      res.status(200).json({
        status: "success",
        code: 200,
        message: `Successfully getting ${result.length} users`,
        data: result,
      });
    } else {
      res.status(200).json({
        status: "success",
        code: 200,
        message: `Successfully getting ${result.length} users`,
        data: [],
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      code: 400,
      code: 400,
      message: "Couldn't get all users",
      err: err.message,
    });
  }
};

module.exports.deleteAUserByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await userService.deleteAUserByIDService(id);
    if (!result.deletedCount) {
      return res.status(400).json({
        status: "failed",
        code: 400,
        message: "Couldn't find this user to delete",
      });
    } else {
      res.status(200).json({
        status: "success",
        code: 200,
        message: "successfully deleted this user",
        data: result,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      code: 400,
      message: "Couldn't delete this user",
      error: err.message,
    });
  }
};

module.exports.getAUserByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "failed",
        code: 400,
        message: "This id is not valid",
      });
    }
    const result = await userService.getAUserByIDService(id);
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Successfully getting this user",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      code: 400,
      message: "Couldn't get this user",
      error: error.message,
    });
  }
};

module.exports.makeUserAdmin = async (req, res, next) => {
  try {
    const { email } = req.params;
    console.log('makeUserAdmin', email)
    const result = await userService.makeUserAdminService(email);
    // res.status(200).json({
    //   status: "success",
    //   code: 200,
    //   message: "Successfully make this user an ADMIN",
    //   data: result,
    // });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      code: 400,
      message: "Couldn't make an Admin",
      error: error.message,
    });
  }
};

module.exports.registerUser = async (req, res, next) => {
  try {
    const result = await userService.registerUserService(req.body);
    const token = generateToken(result);
    res.status(200).json({
      status: "success",
      code: 200,
      message: "User is registered successfully",
      data: { result, token },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      code: 400,
      message: "Couldn't register user",
      err: error.message,
    });
  }
};

//  for login routes, here is few steps
/**
 *1. Check if email & password are given
 *2. Load user with email
 *3. if not user, send res
 *4. compare password,
 *5. if password not correct, send res
 *6. check if user is active
 *7. if not active send res
 *8. generate token
 *9. send user and token
 */
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        status: "failed",
        code: 401,
        error: "Please provide your email & password",
      });
    }

    // checking if user is already in our db, or not?
    const userExists = await userService.findAUserByMail(email);
    // console.log("userExists", userExists);
    if (!userExists) {
      return res.status(401).json({
        status: "failed",
        code: 401,
        error: "No user found. Please create an account",
      });
    }

    const isPasswordMatched = userExists.comparePassword(
      password,
      userExists.password
    );

    if (!isPasswordMatched) {
      return res.status(403).json({
        status: "failed",
        code: 403,
        error: "Password is not correct",
      });
    }

    if (userExists.status != "active") {
      return res.status(401).json({
        status: "failed",
        code: 401,
        error: "Your'e account is not active yet",
      });
    }

    const token = generateToken(userExists);
    const { password: pwd, ...others } = userExists.toObject();

    res.status(200).json({
      status: "success",
      code: 200,
      message: "successfully logged in",
      data: { user: others, token },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      code: 400,
      message: "Couldn't login",
      error: err.message,
    });
  }
};

// update profile
module.exports.UpdateProfileById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "failed",
        code: 400,
        message: "Id is not valid",
      });
    }
    const result = await userService.UpdateProfileByIdService(
      id,
      req.body,
      req.file
    );
    if (result.modifiedCount > 0) {
      res.status(200).json({
        status: "success",
        code: 200,
        message: "successfully update profile",
        data: result,
      });
    } else {
      res.status(400).json({
        status: "failed",
        code: 400,
        message: "Couldn't update profile",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      code: 400,
      message: "Couldn't update profile",
      error: error.message,
    });
  }
};

// change password
module.exports.changePassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "failed",
        code: 400,
        message: "Couldn't find this id",
      });
    }
    // checking if user is already in our db, or not?
    const userExists = await User.findById({ _id: id });
    if (!userExists) {
      return res.status(401).json({
        status: "failed",
        code: 401,
        error: "No user found. Please create an account",
      });
    }
    const isPasswordMatched = userExists.comparePassword(
      data.oldPassword,
      userExists.password
    );
    if (!isPasswordMatched) {
      return res.status(403).json({
        status: "failed",
        code: 403,
        error: "Password is not correct",
      });
    }
    const result = await userService.changePasswordService(id, data);
    if (result.modifiedCount > 0) {
      res.status(200).json({
        status: "success",
        code: 200,
        message: "Successfully updated your password",
        data: result,
      });
    } else {
      res.status(400).json({
        status: "failed",
        code: 400,
        message: "Couldn't update your password",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      code: 400,
      message: "Couldn't update your password",
      error: error.message,
    });
  }
};
