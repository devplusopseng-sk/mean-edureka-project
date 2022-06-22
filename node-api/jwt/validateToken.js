const config = require("config");
const jwt = require("jsonwebtoken");
const { Logger, CustomError } = require("../utilities");
//const { deleteToken } = require("mySqlCalls");

module.exports = (usrToken) => {

    return new Promise((resolve, reject) => {
        

        if (usrToken === undefined || usrToken === "") 
        {
            console.log("token undefined in request.");
            return reject("TOKEN does not exist");
        }

        jwt.verify(usrToken, config.jwt.privateKey, function (err, decoded) {
            if (err) {
                console.log(`error message:${err.message}`);
                console.log(`error message:${err.name}`);
                //  deleteToken(logTxnId, token);

                if (err.name == 'TokenExpiredError') {
                    return reject("EXPIRED TOKEN");
                }
                else if (err.name == 'JsonWebTokenError') {
                    return reject("INVALID TOKEN");
                }
                else {
                    return reject(err.name);
                }
            }
            
            return resolve(decoded);

        });
   });
};