# Stage 3: Storing Data
Now we come to arguably the most important part of this application: storing the memos we supply!

To do this, we are going to use AWS's DynamoDB. This is a highly scalable and performant, document based database. 

While the point of this workshop is not to understand the relative pros and cons of document based databases, it is important to partially understand how document based databases function relative to relational databases. Document based databases store each record as a document, which is something like a JavaScipt object. Each document contains all of the relevant information for that document.

A relational database stores its data in tables, with keys providing relationships between tables. Because of the nature of these relationships, they require quite a rigid structure to be feasible. This structure is called a schema, and the schema for a relational database determines what data each table will contain and the relationship between them.

With document based databases, a schema is not generally required. In the case of DynamoDB, you must only define the name and type of the key field in the record. In our case, we will call the key `memoId`, and it's going to be a UUID that represents the memo. All of the other fields in the memo document are just instantiated as and when we use them.

## DynamoDB
To use DynamoDB in our project, we are going to need to add a resource to our `serverless.yml` file.

```yaml
resources:
  Resources:
    memoTable:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: memoTable
        AttributeDefinitions:
          - AttributeName: memoId
            AttributeType: S # This means the attribute is a string
        KeySchema:
          - AttributeName: memoId
            KeyType: HASH
        ProvisionedThroughput:
          ReadCapacityUnits: 1
          WriteCapacityUnits: 1
```

This resource declares that we want a DynamoDB table, with a table called `memoTable`, and the key for documents in that table is going to be a hash of the `memoId`, which is itself a string.

We also need to allow the Lambda function to access this database, so we will provide it with the relevant IAM permissions.

```yaml
  iamRoleStatements:
    - Effect: Allow
      Action:
        - dynamodb:DescribeTable
        - dynamodb:Query
        - dynamodb:Scan
        - dynamodb:GetItem
        - dynamodb:PutItem
        - dynamodb:UpdateItem
        - dynamodb:DeleteItem
      Resource: "arn:aws:dynamodb:us-east-1:*:*"
```

And lastly, we need to declare an environment variable for our table name, so that we can use it in our code without hard coding it.

```yaml
  environment:
    TABLE_NAME: memoTable
```

With these three things configured, we are free to write the handlers that will use the DynamoDB `put`, `get`, `update`, and `delete` functions. For this we use promises, as it allows us to await the completion of the operation. Without this, our function could terminate before the completion of the operation as callbacks are non-blocking.

We can now go ahead and test the operations we just added using Insomnia. To do this, create a new request with the appropriate method, and a JSON body. It is important to test the create method first, as we require the `id` it returns to be able to build the URLs for the other operations.

If we get any internal server errors, we can work out what is causing them using `serverless logs -f functionname` where `functionname` is any of our functions `create`, `read`, `update`, or `delete`.

Once any issues are resolved (StackOverflow is your friend), we have our working memo API!