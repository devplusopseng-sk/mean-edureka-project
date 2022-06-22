"use strict";
const util = require("util");

class CustomError {
    constructor(status, svcCode, svcMessage) {
        this.status = status;
        this.svcCode = svcCode;
        this.svcMessage = svcMessage;
        Error.captureStackTrace(this, this.constructor);
    }
}

util.inherits(CustomError, Error);

module.exports=CustomError;
