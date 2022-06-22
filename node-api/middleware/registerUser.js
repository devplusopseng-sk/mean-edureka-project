const { mongoClient } = require("../mongoDbCalls");
const { ObjectId } = require("mongodb");
const CryptoJS = require("crypto-js");
module.exports = async (req, res, next) => {

    try {
        console.log(`Inside Register User`);

        // Encrypt
        let ciphertext = CryptoJS.AES.encrypt(req.body.password, 'edukey1278Ef').toString();
        console.log(ciphertext);

        let userDtls = {
            isAdmin: false,
            isActive: true,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            dob: req.body.dob,
            gender: req.body.gender,
            phone: "",
            city: "",
            state: "",
            country: "",
            pincode: "",
            photoId: "0",
            password: ciphertext,
            createdDate: new Date()
        };
        const connection = await mongoClient();
        console.log(`Inseretion Obj : ${JSON.stringify(userDtls)}`);

        const userCollection = connection.collection('users');
        let usrInsObj = await userCollection.insertOne({ userDtls });

        res.status(200).json({
            "message": "User registered successfully",
        })


    } catch (error) {

        console.log(`Error Register User : ${error}`);

        res.status(500).json({
            "status": "Fail",
            "message": error
        })
    }

}