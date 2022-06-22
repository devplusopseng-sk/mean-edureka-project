const { mongoClient } = require("../mongoDbCalls");
const { validateToken } = require("../jwt");
const { ObjectId } = require("mongodb");

module.exports = async (req, res, next) => {

    try {
        console.log(`Inside Fetch Friend By Id`);
        //console.log(`Email User Token : ${req.headers.token}`);
        let isTokenValid = await validateToken(req.headers.token);
        const connection = await mongoClient();
        const collectionUsr = connection.collection('friends');
        const frndObj = await collectionUsr.findOne({
            "_id": ObjectId(req.params.id)
        }, {
            projection: {
                _id: true,
                "frndDtls.friendId": true,
                "frndDtls.userId": true,
                "frndDtls.status": true,
                "frndDtls.createdDate": true
              
            }
        });

        console.log(`Post Obj : ${JSON.stringify(frndObj)}`);
        frndObj.frndDtls._id = frndObj._id;

        res.status(200).json(frndObj.frndDtls)



    } catch (error) {

        console.log(`Error Fetch Friend By Id : ${error}`);

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