const AWS = require("aws-sdk");
const util = require("util");
const s3 = new AWS.S3();
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    let resBody = "";
    let statusCode = 0;

    const srcBucket = event.Records[0].s3.bucket.name;
    const srcKey = event.Records[0].s3.object.key;

    try {
        const getObjectParams = {
            Bucket: srcBucket,
            Key: srcKey
        };

        const s3Data = await s3.getObject(getObjectParams).promise();
        const usersStr = s3Data.Body.toString();
        const usersJSON = JSON.parse(usersStr);

        await Promise.all(
            usersJSON.map(async (userObj) => {
                const { id, firstname, lastname } = userObj;

                const putParams = {
                    TableName: "VIPUsers",
                    Item: {
                        id,
                        firstname,
                        lastname
                    }
                };
                await documentClient.put(putParams).promise();
                resBody = "Successful ::: Users Added";
                statusCode = 201;
            })
        );
    } catch (err) {
        resBody = err;
        statusCode = 403;
        return;
    }

    const response = {
        statusCode,
        body: resBody
    };
    return response;
};
