const { mongoClient } = require("../mongoDbCalls");
const { validateToken } = require("../jwt");
const { ObjectId } = require("mongodb");

module.exports = async (req, res, next) => {

    try {
        console.log(`Inside Update User Photo By Id`);
        //console.log(`Email User Token : ${req.headers.token}`);
        let isTokenValid = await validateToken(req.headers.token);
        const connection = await mongoClient();
        let documentDtls = {
            userId: req.body.id,
            docBase64: req.body.docBase64
        };
        if (req.body.photoId == "0") {
            const docCollection = connection.collection('documents');
            let usrInsObj = await docCollection.insertOne({ documentDtls });
            const collectionUsr = connection.collection('users');
            let updateUsrObj = {
                "userDtls.photoId": usrInsObj.insertedId.toString()
            };
            const usrObj = await collectionUsr.updateOne({
                "_id": ObjectId(req.body.id)
            }, {
                $set: updateUsrObj
            })

            console.log(`User Updt Obj : ${JSON.stringify(usrObj)}`);
        } else {
            const docCollection = connection.collection('documents');
            let updateUsrObj = {
                "documentDtls.docBase64": req.body.docBase64
            };
            const usrObj = await docCollection.updateOne({
                "_id": ObjectId(req.body.photoId)
            }, {
                $set: updateUsrObj
            })

            console.log(`User Updt Obj : ${JSON.stringify(usrObj)}`);
        }


        res.status(200).json({})



    } catch (error) {

        console.log(`Error Update User Photo By Id : ${error}`);

        if (error == "EXPIRED TOKEN" || error == "INVALID TOKEN") {
            res.status(401).json({
                "status": "Fail",
                "message": error
            })
        } else {
            res.status(500).json({
                "status": "Fail",
                "message": error
            })
        }
    }

}