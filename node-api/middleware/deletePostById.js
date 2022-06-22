const { mongoClient } = require("../mongoDbCalls");
const { validateToken } = require("../jwt");
const { ObjectId } = require("mongodb");

module.exports = async (req, res, next) => {

    try {
        console.log(`Inside Delete Post By Id`);
        //console.log(`Email User Token : ${req.headers.token}`);
        let isTokenValid = await validateToken(req.headers.token);
        const connection = await mongoClient();
        const collectionUsr = connection.collection('posts');
        let postDelObj = await collectionUsr.deleteOne({ "_id": ObjectId(req.params.id) });

        console.log(`Post Updt Obj : ${JSON.stringify(postDelObj)}`);

        res.status(200).json({})



    } catch (error) {

        console.log(`Error Delete Post By Id : ${error}`);
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