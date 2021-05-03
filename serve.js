const express = require("express");
const app  = require("express")();
const http = require("http").createServer(app);
const io   = require("socket.io")(http);
const express = require('express');

/**
 * "/"にアクセスがあったらindex.htmlを返却
 */
app.get("/", (req, res)=>{
  res.sendFile(__dirname + "/main.html");
});
app.get("/haiku.js", (req, res)=>{
  res.sendFile(__dirname + "/haiku.js");
});
app.use(express.static('./script'));

app.use('/assets',express.static('assets'));


/**
 * [イベント] ユーザーが接続
 */
io.on("connection", (socket)=>{
  console.log("ユーザーが接続しました");

  socket.on("post", (msg)=>{
    io.emit("member-post", msg);
  });
});

/**
 * 3000番でサーバを起動する
 */
http.listen(3000, ()=>{
  console.log("listening on *:3000");
});