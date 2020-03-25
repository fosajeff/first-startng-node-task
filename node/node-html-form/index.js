const http = require("http");
const fs = require("fs");
const path = require("path");
const qs = require("querystring");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(
      `<form method="POST" action="/message">
            <br><br>
            <center>
                <input style="height: 50px; width:500px; padding:3px" type="text" name="message" placeholder="Enter your message"/>
                <br><br>
                <input type="submit" value="Submit"/>
            </center>
        </form>`
    );
    res.end();
  } else if (req.url === "/message" && req.method == "POST") {
    let userMessage = "";
    req
      .on("data", data => (userMessage += data))
      .on("end", () => {
        const messageData = qs.parse(userMessage).message;
        res.writeHead(200, { "Content-Type": "text/html" });
        fs.appendFile(
          path.join(path.dirname(__filename), "form-data/", "message.txt"),
          messageData + "\n\n",
          err => {
            if (err) throw err;
            // console.log("File append success");
            res.end(
              "<br><br><br><center><h3>Message Submitted Sucessfully!</h3></center>"
            );
          }
        );
      });
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<br><br><br><center><h3>404 - Page not found</h3></center>");
  }
});

server.listen(8000, () => console.log("***Server running on port 8000***"));
