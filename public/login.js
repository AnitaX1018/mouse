const express = require("express");
const { start } = require("repl");
const app = express();
const path = require('path');

const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://test123:test123@cluster1.ztvctcq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect((err) => {
  const db = client.db("users");
  const users = db.collection("users");
});

const http = require("http");

app.get('/download', function(req, res) {
  const file = path.join(__dirname, 'files', 'mouse.pdf');
  res.download(file);
});
http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("登入.html");
    if (req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", async () => {
        const data = JSON.parse(body);
        if (req.url === "/login") {
          // 登錄請求
          const user = await users.findOne({
            username: data.username,
            password: data.password,
          });
          if (user) {
            // 登錄成功
            res.end("Success");
          } else {
            // 登錄失敗
            res.end("Error");
          }
        } else if (req.url === "/register") {
          // 註冊請求
          const result = await users.insertOne({
            username: data.username,
            password: data.password,
          });
          if (result.insertedCount > 0) {
            if (result.insertedCount > 0) {
              // 註冊成功
              res.end("Success");
            } else {
              // 註冊失敗
              res.end("Error");
            }
          }
        }
      });
    }
  })
  .listen(3000);
