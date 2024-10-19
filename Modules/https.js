const req = require("./request.js");
const res = require("./response.js");

function request(url, data) {
  req.send(url, data);
  return res.read();
}

console.log(request("https://www.google.com", "venkat"));
