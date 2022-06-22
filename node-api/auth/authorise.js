
const { mongoClient } = require("mongoDbCalls");
const { ObjectId } = require("mongodb");
const { Logger } = require("utilities");
const generateToken=require("../../jwt/generateToken")
module.exports = async (req, res, next) => {

   

    try {
        console.log(`inside Authorise : ${req.body.userId}`);
        const connection = await mongoClient();
        const usrCollection = connection.collection('users');

        let usrData =  await usrCollection.findOne({"userId": req.body.userId},{
            projection: {
                _id: false,
                firstName: true,
                lastName:true,
                middleName:true,
                role:true
            }
        });
        console.log(usrData);

        if(usrData && req.body.password=="Tata@1234"){

            let accessToken= await generateToken(req.body.userId,usrData.role,"714255")
            res.status(200).json({
                "svcCode": "SUS01",
                "svcStatus": "Success",
                "logTxnId": "114255",
                "userDtls":usrData,
                "accessToken":accessToken.token
            })
        }else{
            res.status(401).json({
                "svcCode": "ERR03",
                "svcStatus": "Fail",
                "logTxnId": "114255",
                "svcMessage":"Unauthorized Access"
            })
        }

               
           
        
    } catch (error) {

        console.log(`Failed for Authorise with error : ${error}`);

        res.status(500).json({
            "svcCode": "ERR02",
            "svcStatus": "Fail",
            "logTxnId": "117455",
            "svcMessage": error
        })
    }



}