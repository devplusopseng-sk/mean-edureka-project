const { mongoClient } = require("../mongoDbCalls");
const { validateToken } = require("../jwt");
const { ObjectId } = require("mongodb");

module.exports = async (req, res, next) => {

    try {
        console.log(`Inside Fetch Post By User`);
        //console.log(`Email User Token : ${req.headers.token}`);
        let isTokenValid = await validateToken(req.headers.token);
        const connection = await mongoClient();
        const collectionUsr = connection.collection('posts');
        const usrObj = await collectionUsr.find({
            "postDtls.userId": req.body.id
        }, {
            projection: {
                _id: true,
                "postDtls.post": true,
                "postDtls.userId": true,
                "postDtls.userName": true,
                "postDtls.userPhotoId": true,
                "postDtls.postImageId": true,
                "postDtls.createdDate": true
            }
        }).toArray();

        console.log(`Post Obj : ${JSON.stringify(usrObj)}`);
       // usrObj.postDtls._id = usrObj._id;

        res.status(200).json(usrObj)



    } catch (error) {

        console.log(`Error Fetch Post By User : ${error}`);

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