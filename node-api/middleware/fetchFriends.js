const { mongoClient } = require("../mongoDbCalls");
const { validateToken } = require("../jwt");
const { ObjectId } = require("mongodb");

module.exports = async (req, res, next) => {

    try {
        console.log(`Inside Fetch All Friends`);
        //console.log(`Email User Token : ${req.headers.token}`);
        let isTokenValid = await validateToken(req.headers.token);
        const connection = await mongoClient();
        const collectionFrnd = connection.collection('friends');
        const frndObj = await collectionFrnd.find({
            "frndDtls.userId": isTokenValid.uId
        }, {
            projection: {
                _id: true,
                "frndDtls.friendId": true,
                "frndDtls.userId": true,
                "frndDtls.status": true,
                "frndDtls.createdDate": true
            }
        }).toArray();
        const recObj = await collectionFrnd.find({
            "frndDtls.friendId": isTokenValid.uId
        }, {
            projection: {
                _id: true,
                "frndDtls.friendId": true,
                "frndDtls.userId": true,
                "frndDtls.status": true,
                "frndDtls.createdDate": true
            }
        }).toArray();

        console.log(`Post Obj : ${JSON.stringify(frndObj)}`);
       
        let processArr=[...frndObj,...recObj];
        console.log(`Processed Obj : ${JSON.stringify(processArr)}`);

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

        for( let i=usrObj.length - 1; i>=0; i--){
            for( let j=0; j<processArr.length; j++){
                if((usrObj[i]._id == processArr[j].frndDtls.friendId) || (usrObj[i]._id == processArr[j].frndDtls.userId)){
                    // usrObj.splice(i, 1);
                    usrObj[i].status = processArr[j].frndDtls.status;
                    usrObj[i].userId = processArr[j].frndDtls.userId;
                    usrObj[i].friendId = processArr[j].frndDtls.friendId;
                    usrObj[i].reqId = processArr[j]._id;
                }
            }
        }

        
        res.status(200).json({
            "requestedFrndArr": frndObj,
            "receivedFrndArr": recObj,
            "processArr":processArr,
            "usrObj":usrObj
        })
        


    } catch (error) {

        console.log(`Error Fetch All Friends : ${error}`);

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