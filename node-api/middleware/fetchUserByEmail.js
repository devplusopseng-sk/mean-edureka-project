const { mongoClient } = require("../mongoDbCalls");
const { validateToken } = require("../jwt");
const { ObjectId } = require("mongodb");

module.exports = async (req, res, next) => {

    try {
        console.log(`Inside Fetch User By Email`);
        //console.log(`Email User Token : ${req.headers.token}`);
        let isTokenValid = await validateToken(req.headers.token);
        const connection = await mongoClient();
        const collectionUsr = connection.collection('users');
        const usrObj = await collectionUsr.findOne({
            "userDtls.email": req.body.email
        }, {
            projection: {
                _id: true,
                "userDtls.isAdmin": true,
                "userDtls.isActive": true,
                "userDtls.firstName": true,
                "userDtls.lastName": true,
                "userDtls.email": true,
                "userDtls.dob": true,
                "userDtls.gender": true,
                "userDtls.phone": true,
                "userDtls.city": true,
                "userDtls.state": true,
                "userDtls.country": true,
                "userDtls.pincode": true,
                "userDtls.photoId": true,
                "userDtls.createdDate": true
            }
        });

        console.log(`User Obj : ${JSON.stringify(usrObj)}`);
        usrObj.userDtls._id = usrObj._id;

        res.status(200).json(usrObj.userDtls)



    } catch (error) {

        console.log(`Error Fetch User By Email : ${error}`);

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