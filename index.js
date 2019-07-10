var request = require("request");
var cheerio = require("cheerio");

// for debugging purposes
var DEBUG = false
if(DEBUG)
  require("request").debug = true;

// remember my cookie
request = request.defaults({ jar: true });

/*
Cookie + csrf_token is needed to succesfully login
We get the cookie + csrf_token by making a GET request to the login page
Then we can make a POST request to login to our form
*/
var res = request.post("https://myanimelist.net/login.php?").auth("omar2535", "asdf", false);
function login(){
  request.post(
    {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      url: "https://myanimelist.net/login.php?",
      form: {
        user_name: null,
        password: null,
        cookie: 1,
        sublogin: "Login",
        submit: 1,
      }
    },
    function(error, response, html) {
      //do your parsing...
      var $ = cheerio.load(html);
      //console.log(html);
      getCSRFToken((err, res) => {
        console.log(res);
      })
    }
  );
}

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

getCSRFToken((err, res)=>{
  console.log(res);
})
// need to grab CSRF token