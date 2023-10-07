import User from "../models//user.js";
import Company from "../models//company.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;
const JWT_SECRET = process.env.JWT_SECRET;

const userController = {
  getHome: (req, res) => {
    if (req.user) {
      const userWithoutPassword = { ...req.user.toJSON() };
      delete userWithoutPassword.password;
      const token = req.cookies.token;
      return res.json({ Status: "Success", user: userWithoutPassword, token });
    } else {
      return res.json({ Status: "Success", user: null, token: null });
    }
  },

  register: async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

      // Check if company exists
      let company = await Company.findOne({
        where: {
          company_name: req.body.company,
        },
      });
      
      let role;
      if (!company) {
        company = await Company.create({
          company_name: req.body.company,
        });
        role = "admin"; // Newly created company, so this user is an admin
      } else {
        role = "member"; // Company already exists, so this user is a member (or whatever default role you prefer)
      }
      
      // Create a new user and associate it with the company
      const newUser = await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashedPassword,
        company_id: company.id,
        role: role, 
      });

      const token = jwt.sign(
        {
          id: newUser.id,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          email: newUser.email,
          company: newUser.company,
          role: newUser.role,
        },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.cookie("token", token);

      return res.json({
        message: "Registration successful",
        user: newUser,
        token,
      });
    } catch (error) {
      console.error("Error occurred during registration:", error);
      return res.status(500).json({ error: "Registration failed" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res
          .status(400)
          .json({ Status: "Email or password is incorrect" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.json({ error: "Email or password is incorrect" });
      }

      const token = jwt.sign(
        {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          company: user.company,
          role: user.role,
        },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.cookie("token", token, { httpOnly: true });
      return res.json({ Status: "Success", token });
    } catch (error) {
      console.error("Error occurred during login:", error);
      return res.status(500).json({ Status: "Login failed" });
    }
  },

  logout: (req, res) => {
    res.clearCookie("token");
    return res.json({ Status: "Success" });
  },
};

export default userController;
