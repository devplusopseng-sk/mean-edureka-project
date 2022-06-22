const { mongoClient } = require("../mongoDbCalls");
const { validateToken } = require("../jwt");
const { ObjectId } = require("mongodb");
const CryptoJS = require("crypto-js");
module.exports = async (req, res, next) => {

    try {
        console.log(`Inside Create Post`);

        let isTokenValid = await validateToken(req.headers.token);
        let postDtls = {
            post: req.body.post,
            userId: req.body.userId,
            userName: req.body.userName,
            userPhotoId: req.body.userPhotoId,
            postImageId: req.body.postImageId,
            createdDate: new Date()
        };
        const connection = await mongoClient();
        console.log(`Insertion Obj : ${JSON.stringify(postDtls)}`);

        const userCollection = connection.collection('posts');
        let usrInsObj = await userCollection.insertOne({ postDtls });

        res.status(200).json({
            "message": "Post created successfully",
        })


    } catch (error) {

        console.log(`Error Create Post : ${error}`);

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