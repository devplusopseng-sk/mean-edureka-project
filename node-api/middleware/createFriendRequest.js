const { mongoClient } = require("../mongoDbCalls");
const { validateToken } = require("../jwt");
const { ObjectId } = require("mongodb");
const CryptoJS = require("crypto-js");
module.exports = async (req, res, next) => {

    try {
        console.log(`Inside Create Friend Request`);

        let isTokenValid = await validateToken(req.headers.token);
        let frndDtls = {
            friendId: req.body.friendId,
            userId: req.body.userId,
            status: req.body.status,
            createdDate: new Date()
        };
        const connection = await mongoClient();
        console.log(`Insertion Obj : ${JSON.stringify(frndDtls)}`);

        const userCollection = connection.collection('friends');
        let usrInsObj = await userCollection.insertOne({ frndDtls });

        res.status(200).json({
            "message": "Friend added successfully",
        })


    } catch (error) {

        console.log(`Error Create Friend Request : ${error}`);

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