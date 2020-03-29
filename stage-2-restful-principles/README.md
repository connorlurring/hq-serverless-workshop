# Stage 2: RESTful Principles

## The Principles

While it is a common misconception that a RESTful API must be HTTP based, this is not the truth. There are however several key principles that make an API RESTful.

Those principles are:
* Contract first approach
* Statelessness
* Client-server model
* Caching
* Layered architecture

### Contract first approach

The contract this principle refers to is not to a legal contract, but an assurance that the URI for a given item in the API will always be the same. If I can always find my particular memo with a GET request to `/memos/123`, and this location does not change, the API fulfils its contract.

If this location were to change, and the URI suddenly became `/memos/id/123` the contract would be broken, and the API would no longer be RESTful.

### Statelessness

This principle is important as it helps ensure consistent behaviour. The idea behind it is the server (or in our case our serverless function) has no knowledge of any requests before the request it is servicing right now. This is easier to visualise in a language context, where you can think of it as the API not having support for a question that is not explicit.

An example of a conversation that doesn't comply with this principle and confuses the server:
```
Client: "Have you watched Breaking Bad?"
Server: "Yes.s"
Client: "What did you think of season 1?"
Server: "What???"
```

To make this stateless, we could change the conversation to:
```
Client: "Have you watched Breaking Bad?"
Server: "Yes."
Client: "What did you think of Breaking Bad season 1?"
Server: "It was excellent."
```

### Client-server(less) model

For this principle, consider our frontend application that consumes the data returned by the API is the client, and the Serverless functions are the server.

What this principle really boils down to is the idea that the client does not need to have any real idea about the underlying implementation of the server, nor does the server need to have any idea how the client is implemented. The common interface between the two is the object schema that they communicate with.

It is important that the server responds to a client in a format that the client can understand, as we are going to be using Node.js, our format will be JSON.

It is also important that the server returns relevant information. While it is almost certain that the client will require the contents of the memo each time, it is probably not necessary for the client to know every previous time the memo has been accessed, for example.

### Caching

This principle is used to counteract the impact of the Statelessness principle, which can result in a lot of lookups for repeated requests. Caching is, of course, stateful. This does not mean that caching goes against the concept of a RESTful API, as the API itself is not storing any state, and instead the cache layer stores is seperate from the API.

In our case, caching the result of requests to our Serverless API will be handled automatically by API Gateway, so we don't need to worry about it.

### Layered architecture

This is the idea that each layer only needs to be aware of adjacent layers, the client only needs to be aware of our API gateway, and the API gateway needs to be aware of the nodes that will be running the Lambda functions. The client does not need to be aware of the nodes that are running the functions.

This allows all underlying implementation to be changed, as long as the interface between layers remains the same.

***

## Our Implementation

Although it is not necessary for an API to be HTTP based to be RESTful, our implementation will be. We will have one route, but we will use multiple HTTP methods to perform different operations on the memos we create.

Our API is going to use POST requests to create a new memo, PUT requests to update memos, GET requests to retrieve memos, and DELETE requests to delete memos.

These routes have now been created in the stage 2 serverless file, and their handlers created in the handler file.