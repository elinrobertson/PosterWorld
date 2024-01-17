const { UserModel } = require("./user.model");
const bcrypt = require("bcrypt");


// Registrera användare
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

//Logga in användare
const loginUser = async (req, res, next) => {
    try {
        const existingUser = await UserModel.findOne({
            email: req.body.email
        }).select("+password");

        if (!existingUser || !(await bcrypt.compare(req.body.password, existingUser.password))) {
            console.log("Login failed for user:", req.body.email);
            return res.status(401).json("Wrong username or password");
        }

        const user = existingUser.toJSON();
        user._id = existingUser._id;
        delete user.password;

        if (req.session && req.session.userId) {
            console.log("User already logged in:", req.session.email);
            return res.status(200).json(user);
        }

        req.session = user;
        res.status(200).json(user);
        console.log("User logged in:", user.email);
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json("Internal Server Error");
    }
};


//Logga ut användare
const logoutUser = async (req, res, next) => {
    try {
        if (!req.session._id) {
            console.log("User not logged in. Cannot logout.");
            return res.status(400).json("Cannot logout when you are not logged in");
        }

        console.log("Logging out user:", req.session.email);

        req.session = null;

        console.log("User logged out successfully");

        res.status(204).json(null);
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json("Internal Server Error");
    }
};

  

module.exports = { registerUser, loginUser, logoutUser }