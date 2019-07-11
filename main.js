var cheerio = require("cheerio");
var fs = require("fs");
var credentials = JSON.parse(fs.readFileSync('./credentials/credentials.json', "utf8"));
var request = require('./request_util');

/*
Cookie + csrf_token is needed to succesfully login
We get the cookie + csrf_token by making a GET request to the login page
Then we can make a POST request to login to our form
*/

// grabs CSRF Token
function getCSRFToken(callback){
  request.get(
    {
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      uri: "https://myanimelist.net/login.php?from=%2F"
    },
    (err, res, body) => {
      if (err) {
        return callback(err);
      } else {
        const $ = cheerio.load(body);
        var txt = $('meta[name="csrf_token"]').attr("content"); // The CSRF token is given on the login page as a meta tag
        var _csrf = txt;
        return callback(null, _csrf);
      }
    }
  );
}

// gets main page
function getMainPage(){
  request.get(
    {
      uri: "https://myanimelist.net"
    },
    (err, res, body) => {
      if (err) {
        return callback(err);
      } else {
        const $ = cheerio.load(body);
        console.log(body);
      }
    }
  );
}

// logs in with cookie
function login() {
  getCSRFToken((err, res) => {
    var csrf_token = res;
    request.post(
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        url: "https://myanimelist.net/login.php?",
        form: {
          user_name: credentials['username'],
          password: credentials['password'],
          cookie: 1,
          sublogin: "Login",
          submit: 1,
          csrf_token: csrf_token
        }
      },
      (err, res, html) => {
        var $ = cheerio.load(html);
        if(html.includes("Your username or password is incorrect.")){
          console.log("SUCCESSFUL LOGIN!");
        }else if(html.includes("Too many failed login attempts. Please try to login again after several hours.")) {
          console.log("TOO MANY UNSUCCESSFUL LOGINS, RETRY AGAIN LATER");
        }
      }
    )
  });
}

login();
// getMainPage();
