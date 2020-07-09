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

    const { id, firstName, lastName } = JSON.parse(event.body);

    const params = {
        TableName: "Users",
        Item: {
            id,
            firstName,
            lastName
        }
    };

    try {
        await documentClient.put(params).promise();
        resBody = JSON.stringify(params.Item);
        statusCode = 200;
    } catch (err) {
        resBody = err;
        statusCode = 400;
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
