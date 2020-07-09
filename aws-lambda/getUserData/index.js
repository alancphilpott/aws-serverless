"use strict";
const AWS = require("aws-sdk");

// Set Relevant Region
AWS.config.update({ region: "eu-west-1" });

// Method 1 - Callback Method
exports.handler = function (event, context, callback) {
    const dDb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

    const params = {
        TableName: "Users",
        Key: {
            id: {
                S: "1"
            }
        }
    };

    dDb.getItem(params, (err, data) => {
        err ? console.log(err, err.stack) : console.log(data);
    });
};

// Method 2 - Callback w/ DocumentClient
exports.handler = function (event, context, callback) {
    const dDb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
    const documentClient = new AWS.DynamoDB.DocumentClient({
        region: "eu-west-1"
    });

    const params = {
        TableName: "Users",
        Key: {
            id: "1"
        }
    };

    documentClient.getItem(params, (err, data) => {
        err ? console.log(err, err.stack) : console.log(data);
    });
};

// Method 3 - Async/Await
exports.handler = async (event, context) => {
    const dDb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
    const documentClient = new AWS.DynamoDB.DocumentClient({
        region: "eu-west-1"
    });

    const params = {
        TableName: "Users",
        Key: {
            id: "1"
        }
    };

    try {
        const data = await documentClient.getItem(params).promise();
        console.log(data);
    } catch (err) {
        console.log(err, err.stack);
    }
};
