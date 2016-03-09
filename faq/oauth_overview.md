# OAuth Overview

Go implements the OAuth protocol to authorize third party application's (client's) request to access data on the Go server.

## What is OAuth?

OAuth is an open-source specification for building a framework for allowing a third-party app (the “client”) to access protected resources from another application (the “provider,” or “resource owner”) at the request of a “user” of the client app. Oauth allows the user to enter his user credentials (ex. username and password) only to the provider app, which then grants the client app permission to view the protected resources on behalf of the user.

#### Common terms:

-   **Provider/Resource Owner** – the app that hosts the protected resource. An example is Twitter which uses OAuth as the protocol for all its clients. In the context of this document, Go is the provider/resource owner.
-   **Client** – the app that requests to see the resource data on behalf of the user. Any Twitter client that shows tweets is an example of this.
-   **User/end user** – the entity who initiates the OAuth flow to allow the client to access protected data from the provider.
-   **Client id/client secret** – Often, provider apps will maintain a list of clients that are allowed to access their data. Client apps can be identified in a number of ways, including with an id and a secret.

## OAuth Authorization Workflow

An overview of the basic OAuth workflow can be found at [Beginner's guide to OAuth](http://oauth.net/documentation/getting-started/).

## Manage OAuth Clients

### Create a new OAuth client

Before any third-party application can use GoCD using OAuth, it needs to be registered in Go as an OAuth client.

-   Login as an administrator to Go.
-   Navigate to the **Admin page** , then the **OAuth Clients** tab.
-   Click the **New OAuth Client** button.
-   Fill in the **Name** and **Redirect URL** for the third-party application. The redirect URL is where Go will send the end-user to once the authorization process is complete.
-   You'll be presented with a summary of the newly registered application. Use the provided Client ID and Secret in the third-party application to enable OAuth communications with Go.

### Edit an existing OAuth client

If you've already registered an OAuth Client, but want to change its name or redirect URL, here's how:

-   Login as an administrator to Go.
-   Navigate to the **Admin page** , then the **OAuth Clients** tab.
-   Locate the Client you want to modify and click the **Edit** link next to it.
-   Edit the necessary fields and click the **Update** button to save your changes.

### Delete an existing OAuth client

If you want to un-register/delete an OAuth Client (prevent it from accessing Go via OAuth), here's how:

-   Login as an administrator to Go.
-   Navigate to the **Admin page** , then the **OAuth Clients** tab.
-   Locate the Client you want to delete and click the **Destroy** link next to it.
-   Confirm the deletion in the popup box.

### Request for authorization code

Your client needs to contact Go server for an authorization code using the client Id and client secret. Go verifies that the requesting application has been registered with it.

Send a request to: https://your-go-server.com:8154/oauth/authorize with the following query parameters:

| Query Parameter | Description
|-----------------| ------------------------------------
| client\_id | (required) The client identifier for your application.
| redirect\_uri | (required) URL where the user should be redirected to after access to the service is granted. This uri can also include url-encoded query parameters
| response\_type | (required) The type of response. Should always be 'code' in this case

**Example Request:**

```
https://www.your-go-server.com:8154/oauth/authorize?redirect_uri=http://www.my_redirect_uri.com&client_id=ac212ddea07c6ac009d26de8090f5918f73ae648dc3676b1f00aeeae4fca67e1&response_type=code
```

If you type the above request on a browser, you should see a form asking you to authorize the client to access the host application on your behalf. Check the check box and submit.

Your browser is redirected to your redirect URI and you should now see your authorization code as the “code” parameter. Save this code, you will need it for the next step.

**Example Response:**

```
http://www.my_redirect_uri.com?code=26a7dea5e7e121be5ad5832a4a5b09d505c234c7625de3f375971264688bdb51
```

### Get access token

For this step you’ll need to send a POST request to /oauth/token with the following key/value pairs as form data:

| Form Data Parameter | Description
|------------------------------------|------------------------------------
| code | (required) This is the authorization code that you got from the previous step.
| grant\_type | (required) Should be 'authorization-code' for this request.
| client\_id | (required) The client identifier for your application.
| client\_secret | (required) The client secret for your application.
| redirect\_uri | (required) URL where the user should be redirected to after access to the service is granted. This uri can also include url-encoded query parameters

**Example Request (in curl)** :

```shell
curl  https://www.your-go-server:8154/go/oauth/token -d  "code=26a7dea5e7e121be5ad5832a4a5b09d505c234c7625de3f375971264688bdb51&grant_type=authorization-code&client_id=ac212ddea07c6ac009d26de8090f5918f73ae648dc3676b1f00aeeae4fca67e1&client_secret=d1b54df502f162108a6136ec584dc637a7ad5578832a5db364e0d7b47657c718&redirect_uri=www.my_redirect_uri.com" -v
```

The response to the above POST request will be a JSON containing your access token, and its expiration time in seconds

**Example Response:**

```
{:access_token => f180f7bb68d38531aac2f49e5b0cac0c5ed5ced9b72842a429e783747e819664, :expires_in => 3529, :refresh_token => e1n54df802f162108a6336ec584dc637a7ad5578832a5db364e0d7b47657c875}

```

### Use the access token

Now you are ready to query data from the Go server.

**Example Request:**

```shell
curl -H 'Authorization: Token token="f180f7bb68d38531aac2f49e5b0cac0c5ed5ced9b72842a429e783747e819664"' https://www.your-go-server.com:8154/go/cctray.xml
```
