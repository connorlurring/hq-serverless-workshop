'use strict';
const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

function buildResponse(statusCode, bodyObject) {
  return {
    statusCode,
    body: JSON.stringify(
      bodyObject,
      null,
      2
    )
  }
}

module.exports.create = async event => {
  /**
   * We will create the memo here, and return the memo ID
   */

  const bodyObj = JSON.parse(event.body);
  const memoId = uuid.v4();

  const data = {
    TableName: process.env.TABLE_NAME,
    Item: {
      memoId,
      memoContents: bodyObj.contents,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDb.put(data).promise();
    return buildResponse(200, { memoId });
  } catch (err) {
    return buildResponse(500, { success: false });
  }
};

module.exports.read = async event => {
  /**
   * We will retrieve the memo here, and return the contents
   */

  const memoId = event.pathParameters.id;

  const query = {
    TableName: process.env.TABLE_NAME,
    Key: {
      memoId
    }
  };

  try {
    let result = await dynamoDb.get(query).promise();
    if (result) {
      return buildResponse(200, { contents: result.Item.memoContents });
    }
    return buildResponse(404, {});
  } catch (err) {
    return buildResponse(500, { success: false });
  }
}

module.exports.update = async event => {
  /**
   * We will update the memo here
   */

  //return buildResponse(200, { contents: event.body });

  const bodyObj = JSON.parse(event.body);
  const memoId = event.pathParameters.id;

  const query = {
    TableName: process.env.TABLE_NAME,
    Key: {
      memoId
    },
    UpdateExpression: "SET memoContents = :memoContents",
    ConditionExpression: "attribute_exists(memoId)",
    ExpressionAttributeValues: {
      ":memoContents": bodyObj.contents
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    let result = await dynamoDb.update(query).promise();
    if (result) {
      return buildResponse(200, {});
    }
    return buildResponse(404, {});
  } catch (err) {
    return buildResponse(500, { success: false });
  }
}

module.exports.delete = async event => {
  /**
   * We will delete the memo here
   */
  const memoId = event.pathParameters.id;

  const query = {
    TableName: process.env.TABLE_NAME,
    Key: {
      memoId
    }
  };

  try {
    await dynamoDb.delete(query).promise();
    return buildResponse(200, { success: true });
  } catch (err) {
    return buildResponse(500, { success: false });
  }
}