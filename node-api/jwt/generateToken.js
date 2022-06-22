'use strict';
const config = require("config");
const jwt = require("jsonwebtoken");

const { Logger, CustomError } = require("../utilities");


module.exports = (userId) => {


    return new Promise(function (resolve, reject) {
        jwt.sign({
            uId: userId
        }, config.jwt.privateKey, {
            expiresIn: config.jwt.expireTime
        }, function (err, token) {

            if (err) {
                console.log(`${err}`);
                return reject(
                    "Internal Server Error.Please contact Support Team."
                );
            }
            console.log(`generated token: ${token}`);
            return resolve({ token: token });
        });

    });
};