const express = require("express");
const UserService = require('../services/user.service.js');
const serviceUser = new UserService();
const isAdmin = require("../middlewares/authAdmin.js");
const allUserController = require('../controllers/alluser.controller.js')
const uploader = require('../utils/utils');
const isUser = require("../middlewares/authUser.js");
const alluserController = new allUserController();
const AllUserRouter = express.Router();

AllUserRouter.get("/", isAdmin, alluserController.getAllUser)
AllUserRouter.put('/:uid',isAdmin, alluserController.updateDataUser)
AllUserRouter.delete('/:uid',isAdmin, alluserController.deleteUser)

AllUserRouter.get('/profile/',isUser, alluserController.getDocumentUser)

AllUserRouter.post('/:uid/documents',uploader.single('documents'), alluserController.addDocumentUser)
AllUserRouter.put('/premium/:uid',uploader.fields([
    { name: 'identificacion' },
    { name: 'domicilio' },
    { name: 'estadoCuenta' }
  ]), 
  alluserController.updateUserPremium
);

AllUserRouter.put('/:uid/documents',uploader.single('profile'), 
  alluserController.updateUserPremium
);


module.exports = AllUserRouter;