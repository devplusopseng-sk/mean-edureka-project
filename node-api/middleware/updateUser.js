const { mongoClient } = require("../mongoDbCalls");
const { validateToken } = require("../jwt");
const { ObjectId } = require("mongodb");

module.exports = async (req, res, next) => {

    try {
        console.log(`Inside Update User By Id`);
        //console.log(`Email User Token : ${req.headers.token}`);
        let isTokenValid = await validateToken(req.headers.token);
        const connection = await mongoClient();
        const collectionUsr = connection.collection('users');
        let updateUsrObj = {
            "userDtls.firstName": req.body.firstName,
            "userDtls.lastName": req.body.lastName,
            "userDtls.dob": req.body.dob,
            "userDtls.gender": req.body.gender,
            "userDtls.phone": req.body.phone,
            "userDtls.city": req.body.city,
            "userDtls.state": req.body.state,
            "userDtls.country": req.body.country,
            "userDtls.pincode": req.body.pincode
        };
        const usrObj = await collectionUsr.updateOne({
            "_id": ObjectId(req.params.userId)
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