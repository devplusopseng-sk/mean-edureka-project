const { mongoClient } = require("../mongoDbCalls");
const { validateToken } = require("../jwt");
const { ObjectId } = require("mongodb");
const CryptoJS = require("crypto-js");

module.exports = async (req, res, next) => {

    try {
        console.log(`Inside Change Password`);
        //console.log(`Email User Token : ${req.headers.token}`);
        let isTokenValid = await validateToken(req.headers.token);
        let ciphertext = CryptoJS.AES.encrypt(req.body.password, 'edukey1278Ef').toString();
        console.log(ciphertext);
        const connection = await mongoClient();
        const collectionUsr = connection.collection('users');
        let updateUsrObj = {
            "userDtls.password": ciphertext
        };
        const usrObj = await collectionUsr.updateOne({
            "_id": ObjectId(isTokenValid.uId)
        }, {
            $set: updateUsrObj
        })

        console.log(`Change Pwd Obj : ${JSON.stringify(usrObj)}`);

        res.status(200).json({})



    } catch (error) {

        console.log(`Error Change Pwd User : ${error}`);

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