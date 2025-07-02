const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const { orderId, userId } = JSON.parse(event.body);
  await db.put({
    TableName: 'OrderEvents',
    Item: { pk: `ORDER#${orderId}`, sk: `EVENT#${Date.now()}`, userId },
  }).promise();
  return { statusCode: 200, body: JSON.stringify({ status: 'queued' }) };
};
