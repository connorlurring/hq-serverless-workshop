# Stage 1: Hello World

In this stage, we make some changes from our initial `serverless.yml` to enable our hello-world function to be accessible from an HTTP request.

Our new function entry in our `serverless.yml` is now:

```yaml
functions:
  hello:
    handler: handler.hello
    events:
      - http:
          path: hello
          method: get
```

Adding the `http` event to the function's `events` list allows us to trigger this function through an HTTP request.

As we deploy this stage using `sls deploy`, we can see that we are returned an additional piece of data in our output:

```
endpoints:
  GET - https://ru2ezbcjm4.execute-api.us-east-1.amazonaws.com/dev/runhello
```

And if we navigate to that URL, we can see the output of our hello-world function, showing us all of the information provided to it by the input event.

Now we have the building blocks of a REST api: we are able to create handler functions, and call those functions with an HTTP request.