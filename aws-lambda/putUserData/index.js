"use strict";
const AWS = require("aws-sdk");

AWS.config.update({ region: "eu-west-1" });

exports.handler = async (event, context) => {
    const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08" });
    const documentClient = new AWS.DynamoDB.DocumentClient({
        region: "eu-west-1"
    });

    const params = {
        TableName: "Users",
        Item: {
            id: "1",
            firstName: "Aldo",
            lastName: "Thomann"
        }
    };

    try {
        await documentClient.put(params).promise();
        console.log(params.Item);
    } catch (err) {
        console.log(err);
    }
};
