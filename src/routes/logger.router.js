const express = require("express");
const LoggerController = require('../controllers/logger.controller');
const addLoggers = require("../utils/logger");
const loggerControllers = new LoggerController()
const loggerRouter =express.Router();


loggerRouter.get('/',addLoggers, loggerControllers.printTest)

module.exports = loggerRouter;