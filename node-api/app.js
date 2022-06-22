/*Try to run this code on browser as http://localhost:8090/
Output will be Application is working with version: 1.0.0*/

const express = require('express');
const bodyparser = require('body-parser')
const helmet = require('helmet');
const config = require("config");
const { Logger } = require("./utilities");
const app = express({
    caseSensitive: true
});

const { mongoClient } = require("./mongoDbCalls");
mongoClient();
const async = require('async');
const VERSION = require("./package.json").version;
const routers = require('./routers');
const com = require('compression');
const cors = require('cors');

app.use(com());
app.disable('x-powered-by'); //for security reasons
app.use(helmet.ieNoOpen()); //for security reasons
app.use(helmet.xssFilter()) //for security reasons
// app.use(bodyparser.json());//this helps in parsing the request body
// app.use(bodyparser.json({limit: '5mb'}));   // Increases the request limit to 5 MB
app.use(cors());

//app.use(txtID.getTxtId);
app.use(bodyparser.json({
    limit: '15mb'
}));
app.use(bodyparser.urlencoded({
    limit: '15mb',
    extended: true
}));
//app.use(zipkinMiddleware({tracer}));
app.get("/", function (req, res) {
    console.log("Method / is called ");
    Logger.info("Method / is called ");
    res.send(`Framework is working with version : ${VERSION}`);
});

app.use('/users', routers.users);
app.use('/posts', routers.posts);
app.use('/masters', routers.master);
app.use('/friends', routers.friends);

app.use(function (err, req, res, next) {
    //  res.status(400).json(err);
    Logger.error(' in error handler ' + JSON.stringify(err));
    Logger.error(' in error handler ' + err);

    if (err instanceof CustomError) {

        return res.status(err.status).json({
            "status": "Fail",
            "message": "Internal Server Error.Please contact Support Team."

        });
    } else {
        Logger.warn("validation failed" + err);

        return res.status(500).json({
            "status": "Fail",
            "message": "Internal Server Error.Please contact Support Team."

        });
    }

});

const server = app.listen(process.env.PORT || 8080, function () {
    console.log("Server is listening on port 8080");
    Logger.info("Server is listening on port 8080");
});



