const { UserModel } = require("./user.model");
const bcrypt = require("bcrypt");


const registerUser = async(req,res, next) => {
    try {
        const existingUser = await UserModel.findOne({ email: req.body.email })
        if(existingUser) {
            return res.status(409).json("User already exists");
        }
        const user = await UserModel(req.body);
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        user.password = hashedPassword;
        await user.save();
        user.password = undefined;
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json(error)
    }
}


const loginUser = async (req, res, next) => {
    try {
      const existingUser = await UserModel.findOne({
        email: req.body.email
      }).select("+password");
  
      if (req.session && !req.session._id) {
        req.session._id = existingUser._id;
        req.session.email = existingUser.email;
        console.log("User logged in:", existingUser.email);
        return res.status(200).json(existingUser);
      }
  
      console.log("User already logged in:", req.session.email);
      return res.status(200).json(existingUser);
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json("Internal Server Error");
    }
  };


const logoutUser = async (req, res, next) => {
    try {
        console.log("Session before logout:", req.session);
      
        if (!req.session._id) {
          console.log("User not logged in. Cannot logout.");
          return res.status(400).json("Cannot logout when you are not logged in");
        }
      
        console.log("Logging out user:", req.session.email);
      
        req.session.destroy((err) => {
          if (err) {
            console.error("Error during logout:", err);
            return res.status(500).json("Internal Server Error");
          }
          console.log("User logged out successfully");
          res.status(204).json(null);
        });
      
        console.log("User logged out successfully");
      } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json("Internal Server Error");
      }
  };
  

  

module.exports = { registerUser, loginUser, logoutUser }