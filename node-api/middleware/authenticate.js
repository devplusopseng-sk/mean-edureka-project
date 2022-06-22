const { mongoClient } = require("../mongoDbCalls");
const { generateToken } = require("../jwt");
const { ObjectId } = require("mongodb");
const CryptoJS = require("crypto-js");
module.exports = async (req, res, next) => {

    try {
        console.log(`Inside Authenticate User`);
        const connection = await mongoClient();
        const collectionUsr = connection.collection('users');
        console.log(`Email User : ${req.body.email}`);
        const usrObj = await collectionUsr.findOne({ "userDtls.email": req.body.email });

        console.log(`User Obj : ${JSON.stringify(usrObj)}`);
        //Decrypt
        let bytes = CryptoJS.AES.decrypt(usrObj.userDtls.password, 'edukey1278Ef');
        let originalText = bytes.toString(CryptoJS.enc.Utf8);
        //console.log(originalText); 

        if (originalText === req.body.password) {
            let usrToken = await generateToken(usrObj._id);
            usrObj.userDtls._id = usrObj._id;
            usrObj.userDtls.token = usrToken.token;
            delete usrObj.userDtls.password;
            res.status(200).json(usrObj.userDtls)
        }


    } catch (error) {

        console.log(`Error Authenticate User : ${error}`);

        res.status(500).json({
            "status": "Fail",
            "message": error
        })
    }

}