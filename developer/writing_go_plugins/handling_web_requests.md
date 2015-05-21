## Message: Web Requests

This message is sent by the server, when it receives a web request with URL of form `<go-server>/go/plugin/interact/<plugin-id>/<request-name>`. Go Server simply delegates these requests to the plugin specified in the URL (`plugin-id`) with request name specified in the URL (`request-name`) along with all the request parameters & headers.

### Request - From the server

***Request name***: Request name specified by URL

***Request parameters***: HTTP request parameters

***Request headers***: HTTP request headers

***Request body***: empty


### Response - From the plugin

The plugin is expected to send a response, which is equivalent to HTTP response.

* If plugin's reponse code is 200 then the Go Server serves content of `Response body` as HTTP response with `Content-Type` specified in `Response headers` (if not present this defaults to "text/html; charset=UTF-8")
* If plugin's response code is 302 then the Go Server redirects the request to `Location` specified in `Response headers`

***Response code***: HTTP response code

***Response headers***: HTTP response headers

***Response body***: String if response code is 200, else empty
