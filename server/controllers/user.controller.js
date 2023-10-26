import User from "../models/user.js";
import Company from "../models/company.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { OAuth2Client as GoogleOAuth2Client } from "google-auth-library";

import fs from "fs";

const credentials = JSON.parse(fs.readFileSync("./credentials.json", "utf8"));

const { client_secret, client_id, redirect_uris } = credentials.web;
const verificationToken = "your_verification_token_here";
const baseRedirectUri = credentials.web.redirect_uris[0];
const actualRedirectUri = baseRedirectUri.replace(
  "${verificationToken}",
  verificationToken
);

const OAuth2Client = new GoogleOAuth2Client(
  client_id,
  client_secret,
  actualRedirectUri
);

OAuth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
  access_token: process.env.ACCESS_TOKEN,
  expiry_date: "3599",
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "danmaisano@gmail.com",
    clientId: client_id,
    clientSecret: client_secret,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: process.env.ACCESS_TOKEN,
  },
});
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

  getAllUsersByCompany: async (req, res) => {
    try {
      const { company_id } = req.params;

      // Check if company exists
      const company = await Company.findByPk(company_id);

      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }

      // Fetch all users with the specified company_id
      const users = await User.findAll({
        where: {
          company_id: company_id,
        },
        attributes: ["id", "first_name", "last_name", "email", "role"], // Select only the desired attributes
      });

      return res.json({ users });
    } catch (error) {
      console.error("Error occurred while fetching users:", error);
      return res.status(500).json({ error: "Failed to fetch users" });
    }
  },

  register: async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

      let company = await Company.create({
        company_name: req.body.company,
      });

      // Create a new user and associate it with the company
      const newUser = await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashedPassword,
        company_id: company.id,
        status: "registered",
        role: "admin",
        invited: false,
      });

      //Sending emails for verification
      const verificationToken = jwt.sign(
        //email verification token only
        { userId: newUser.id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: newUser.email,
        subject: "Verify your email for Kizer",
        html: `<p><a href="http://localhost:8081/users/verify/${verificationToken}">Click to verify your email, or some shit</a></p>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          return res
            .status(201)
            .json({ message: "User created and email verification link sent" });
        }
      });
    } catch (error) {
      console.error("Error occurred during registration:", error);
      return res.status(500).json({ error: "Registration failed" });
    }
  },

  createUser: async (req, res) => {
    const randomBytes = crypto.randomBytes(16).toString("hex");
    const currentDateTime = new Date().toISOString();
    const tempPassword = `${randomBytes}_${currentDateTime}`;
    const saltRounds = 10;
    const hashedTempPassword = await bcrypt.hash(tempPassword, saltRounds);

    try {
      const newUser = await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        company_id: req.body.company_id,
        role: req.body.role,
        status: "registered",
        password: hashedTempPassword,
        invited: true,
      });
      const verificationToken = jwt.sign(
        //email verification token only
        { userId: newUser.id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: newUser.email,
        subject: "Verify your email",
        html: `<p><a href="http://localhost:8081/users/verify/${verificationToken}">Click to verify your email, or some shit</a></p>`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ error: "Email sending failed" });
        } else {
          return res
            .status(201)
            .json({ message: "User created and email verification link sent" });
        }
      });
    } catch (error) {
      console.error("Error occurred during registration:", error);
      return res.status(500).json({ error: "Registration failed" });
    }
  },

  verifyEmail: async (req, res) => {
    try {
      const verificationToken = req.params.token;

      // Step 2: Decode and verify the incoming token
      const decodedToken = jwt.verify(
        verificationToken,
        process.env.JWT_SECRET
      );

      const user = await User.findOne({ where: { email: decodedToken.email } });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Step 3: Update the user status and generate a new token for password update
      user.status = "verified";
      await user.save();

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" } // 1 hour expiry
      );

      // Step 4: Redirect to the updatePassword page with the new token
      if (user.invited) {
        return res.redirect(`http://localhost:5173/updatePassword?token=${token}`);

      } else {
        user.status = "active";
        await user.save();
        return res.redirect("http://localhost:5173/login");
      }
    } catch (error) {
      if (
        error.name === "TokenExpiredError" ||
        error.name === "JsonWebTokenError"
      ) {
        return res
          .status(400)
          .json({ error: "Verification link is invalid or has expired." });
      }
      console.error("Error occurred during email verification:", error);
      return res.status(500).json({ error: "Email verification failed" });
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
          company: user.company_id,
          role: user.role,
        },
        JWT_SECRET,
        { expiresIn: "30d" }
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

  updatePassword: async (req, res) => {
    try {
      const { token, password, confirmPassword } = req.body;

      // Verify the token.
      let decodedToken;
      try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        return res.status(400).json({ Status: "Invalid or expired token" });
      }

      // Find the user with the email in the token
      const user = await User.findOne({ where: { email: decodedToken.email } });

      if (!user) {
        return res
          .status(400)
          .json({ Status: "Email or password is incorrect" });
      }

      if (password !== confirmPassword) {
        return res
          .status(400)
          .json({ Status: "Password and Confirm Password must match" });
      }

      const saltRounds = 10; // Make sure to define saltRounds
      const newPassword = await bcrypt.hash(password, saltRounds);
      user.password = newPassword;
      user.status = "active";
      await user.save();

      return res.status(200).json({ Status: "Password updated successfully" });
    } catch (error) {
      console.error("Error occurred during password update:", error);
      return res.status(500).json({ Status: "Password update failed" });
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const token = crypto.randomBytes(32).toString("hex");
      // Store this token securely in your database associated with the user's email

      // Send email with the reset token
      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: user.email,
        subject: "Reset your password",
        html: `<p><a href="http://localhost:5173/updatePassword/${token}">Click to reset your password</a></p>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ error: "Email sending failed" });
        } else {
          return res
            .status(201)
            .json({ message: "Email sent for password reset" });
        }
      });
    } catch (error) {
      console.error("Error occurred:", error);
      return res
        .status(500)
        .json({ error: "Failed to initiate password reset" });
    }
  },

  updateUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const { id, first_name, last_name, email, role } = req.body;

      // Find the user by ID
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Conditionally update user details
      if (id) user.id = id;
      if (first_name) user.first_name = first_name;
      if (last_name) user.last_name = last_name;
      if (email) user.email = email;
      if (role) user.role = role;

      await user.save();

      return res.json({ message: "User updated successfully", user });
    } catch (error) {
      console.error("Error occurred during user update:", error);
      return res.status(500).json({ error: "Failed to update user" });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userId = req.params.id;

      // Find the user by ID and delete
      const result = await User.destroy({ where: { id: userId } });

      if (result === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error occurred during user deletion:", error);
      return res.status(500).json({ error: "Failed to delete user" });
    }
  },
};

export default userController;
