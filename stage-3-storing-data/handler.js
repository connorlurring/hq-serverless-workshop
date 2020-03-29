'use strict';
const uuid = require('uuid');
const aws = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

function buildResponse(statusCode, bodyObject) {
  return {
    statusCode: 200,
    body: JSON.stringify(
      body,
      null,
      2
    )
  }
}

module.exports.create = async event => {
  /**
   * We will create the memo here, and return the memo ID
   */

  const reqBody = JSON.parse(event.body);
  const memoId = uuid.v4();

  const data = {
    TableName: 'memos',
    Item: {
      memoId,
      memoContent: reqBody.content,
      createdDate: Date.now(),
    }
  }

  dynamoDb.put(data, (err, data) => {

  })

  return buildResponse(200, { id: memoId });
};

module.exports.read = async event => {
  /**
   * We will retrieve the memo here, and return the contents
   */

  const reqBody = JSON.parse(event.body);
}

module.exports.update = async event => {
  /**
   * We will update the memo here
   */

  const reqBody = JSON.parse(event.body);
}

module.exports.delete = async event => {
  /**
   * We will delete the memo here
   */
  const reqBody = JSON.parse(event.body);
  
}