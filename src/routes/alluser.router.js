const express = require("express");
const UserService = require('../services/user.service.js');
const serviceUser = new UserService();
const isAdmin = require("../middlewares/authAdmin.js");
const AllUserRouter = express.Router();

AllUserRouter.get("/", isAdmin, async (req,res)=> {
    try {


      data = await serviceUser.AllUser({});
        console.log(data)

        const users = data.map((user) => {
            return {
              id: user._id,
              email: user.email,
              firstName: user.firstName,
              password: user.password,
              role: user.role,
            };
        })
        const title = "Administrador";
        return res.status(200).render("authAdmin", { users, title });
        

    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ status: "error", msg: "Invalid input AllUserRouter", data: {} })
        } else {
            res.status(500).json({ status: "error", msg: "Error in server", data: {} })
        }
    }

})

module.exports = AllUserRouter;