var FileCookieStore = require("tough-cookie-filestore");
var request = require("request");
var fs = require("fs");

// create jar file
var cookiepath = "./credentials/cookies.json";

// create the json file if it does not exist
if (!fs.existsSync(cookiepath)) {
  fs.closeSync(fs.openSync(cookiepath, "w"));
}

// use the FileCookieStore with the request package
var jar = request.jar(new FileCookieStore(cookiepath));
request = request.defaults({ jar: jar });

module.exports = request;