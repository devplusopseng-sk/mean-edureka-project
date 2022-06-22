const {createLogger,format,transports} = require('winston');
const winstonConfig=require('winston').config;
require('winston-daily-rotate-file');
//winston.config.syslog.levels
const config = require('config');
let customLevels={...winstonConfig.npm.levels,metrics:2}
 

 
module.exports =  createLogger({
    format:format.combine(
      format.timestamp({
        format:"DD-MMM-YYYY T hh:mm:ss:SSS A"
      }),
      format.json()
    ),
  transports: [
    new (transports.DailyRotateFile)({
            filename: config.logProperties.fileName,
            dirname:config.logProperties.filePath,
            datePattern: 'YYYY-MM-DD',
            maxsize:config.logProperties.maxsize,
            level:config.logProperties.level,
            maxFiles:config.logProperties.maxDays
          }),new transports.Console( {
            level:'debug'
        })
  ],
  levels: customLevels
});