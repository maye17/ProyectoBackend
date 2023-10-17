

class LoggerController{


    async printTest(req, res) {
        req.logger.debug('Debug');
        req.logger.http('info');
        req.logger.info('info');
        req.logger.warn('Warning');
        req.logger.error('error');
        req.logger.error('fatal');
        res.send({ message: 'Prueba de Winston' });
      }
    }

    
    module.exports = LoggerController;