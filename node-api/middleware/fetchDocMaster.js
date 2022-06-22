const { mongoClient } = require("../mongoDbCalls");
const { validateToken } = require("../jwt");
const { ObjectId } = require("mongodb");

module.exports = async (req, res, next) => {

    try {
        console.log(`Inside Fetch All Photos`);
        //console.log(`Email User Token : ${req.headers.token}`);
        let finalArr = [];
        let isTokenValid = await validateToken(req.headers.token);
        const connection = await mongoClient();
        const collectionUsr = connection.collection('documents');
        const docMaster = await collectionUsr.find({

        }, {
            projection: {
                _id: true,
                "documentDtls.docBase64": true,
                "documentDtls.userId": true
            }
        }).toArray();

        console.log(`User Obj : ${JSON.stringify(docMaster)}`);
        let masterObj = {
        };
        for (const element of docMaster) {
            masterObj[element._id] = element.documentDtls.docBase64;
            console.log(element);
            console.log(masterObj);
        }

        res.status(200).json(masterObj)



    } catch (error) {

        console.log(`Error Fetch All Photos : ${error}`);

        res.status(500).json({
            "status": "Fail",
            "message": error
        })
    }

}