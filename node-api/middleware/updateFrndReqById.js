const { mongoClient } = require("../mongoDbCalls");
const { validateToken } = require("../jwt");
const { ObjectId } = require("mongodb");

module.exports = async (req, res, next) => {

    try {
        console.log(`Inside Update Frnd Req User By Id`);
        //console.log(`Email User Token : ${req.headers.token}`);
        let isTokenValid = await validateToken(req.headers.token);
        const connection = await mongoClient();
        const collectionUsr = connection.collection('friends');
        let updateUsrObj = {
            "frndDtls.status": req.body.status
        };
        const usrObj = await collectionUsr.updateOne({
            "_id": ObjectId(req.params.id)
        }, {
            $set: updateUsrObj
        })

        console.log(`User Updt Obj : ${JSON.stringify(usrObj)}`);

        res.status(200).json({})



    } catch (error) {

        console.log(`Error Update User By Id : ${error}`);

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