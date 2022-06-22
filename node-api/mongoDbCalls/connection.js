const { MongoClient } = require("mongodb");
const config = require("config");

let username = encodeURIComponent(config.mongoDbProperties.username);
let password = encodeURIComponent(config.mongoDbProperties.password);

if(process.env.NODE_ENV==="stage" || process.env.NODE_ENV==="production"){
     username = encodeURIComponent(process.env.DB_USERNAME);
     password = encodeURIComponent(process.env.DB_PASSWORD); 
}

// const uri = `mongodb://${username}:${password}@${config.mongoDbProperties.host}:${config.mongoDbProperties.port}`;
const uri = `mongodb://${config.mongoDbProperties.host}:${config.mongoDbProperties.port}`;

var client;

module.exports = async () => {

    console.log('inside connection pool');

    try {

        if (client == undefined || client == null || client == '') {
            console.log('client is null');
            client = await MongoClient.connect(uri, config.mongoDbProperties.options);
            console.log('client connected');

            client.on('commandStarted', (event) => console.log(`command started:${JSON.stringify(event)}`));
            client.on('commandSucceeded', (event) => console.log(`command Succeeded:${JSON.stringify(event)}`));
            client.on('commandFailed', (event) => console.log(`command Failed:${JSON.stringify(event)}`));
            //return client;
            const database = client.db(config.get('mongoDbProperties.database'));
            return database;
        } else {
            console.log('client is not null');
            const database = client.db(config.get('mongoDbProperties.database'));
            return database;

        }

    }
    catch (error) {
        console.log("error connection Database:" + error);
    }

}