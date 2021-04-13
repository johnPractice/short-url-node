// TODO : create app.js 🙂
const http = require("http");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);
const connectDB = require("./src/DB/db");
const morgan = require("morgan");
const urlRouter = require("./src/router/url/url.router");
connectDB();
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan("dev"));
app.use("/url", urlRouter);
server.listen(port, () => {
  console.clear();
  console.log("server run at port " + port);
});
