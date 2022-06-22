const { mongoClient } = require("../mongoDbCalls");
const { validateToken } = require("../jwt");
const { ObjectId } = require("mongodb");

module.exports = async (req, res, next) => {

    try {
        console.log(`Inside Fetch All User`);
        //console.log(`Email User Token : ${req.headers.token}`);
        let isTokenValid = await validateToken(req.headers.token);
        const connection = await mongoClient();
        const collectionUsr = connection.collection('users');
        const usrObj = await collectionUsr.find({
      
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
        }).toArray();

        console.log(`User Obj : ${JSON.stringify(usrObj)}`);
        //Decrypt
        
            res.status(200).json(usrObj)
        


    } catch (error) {

        console.log(`Error Fetch All User : ${error}`);

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