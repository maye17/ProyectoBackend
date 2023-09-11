const winston = require('winston')


const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({level: "http"}),
        new winston.transports.File({ filename: './errors.log', level: 'warn'})
    ]
})


const addLoggers = (req, res, next) => {
    req.logger = logger;
    logger.http(`${req.method} en ${req.url} - ${new Date().toDateString()}`)
    next()
}

module.exports = addLoggers;