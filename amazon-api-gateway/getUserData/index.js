"use strict";
const AWS = require("aws-sdk");

AWS.config.update({ region: "eu-west-1" });

exports.handler = async (event, context) => {
    const dDb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
    const documentClient = new AWS.DynamoDB.DocumentClient({
        region: "eu-west-1"
    });

    let resBody = "";
    let statusCode = 0;

    const { id } = event.pathParameters;

    const params = {
        TableName: "Users",
        Key: {
            id: id
        }
    };

    try {
        const data = await documentClient.get(params).promise();
        resBody = JSON.stringify(data.Item);
        statusCode = 200;
    } catch (err) {
        resBody = err;
        statusCode = 403;
    }

    const res = {
        statusCode: statusCode,
        headers: {
            "my-header": "test-header"
        },
        body: resBody
    };
    return res;
};
