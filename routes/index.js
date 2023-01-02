var express = require("express");
var router = express.Router();
const db = require("../models/userData"); //資料庫

//登入帳號
router.get("/login", async function (req, res) {
  
  let q = req.query; //使用者登入資料

  let data = await db.findOne({
    username: q.username,
    password: q.password,
  });

  if (data) res.send("ok");
  else res.send("fail");
});

//註冊帳號
router.post("/register", async function (req, res) {
  let q = req.body; //使用者註冊資料

  //資料庫中尋找符合該帳號的資料
  let check = await db.findOne({
    username: q.username,
  });

  if (!check) {
    //如果不存在此帳號
    await db.collection.insertOne(
      {
        username: q.username,
        password: q.password,
        point: "0", //點數
        record: "0", //分數
      },
      function (err, res) {
        if (err) throw err;
        console.log("註冊成功");
      }
    );
    res.send("ok");
  } else {
    //帳號已存在
    console.log("註冊失敗 帳號已重複");
    res.send("fail");
  }
});

//索取資料
router.get("/data", async function (req, res) {
  let q = req.query;

  let data = await db.findOne({
    username: q.username,
  });
  if (data) res.send(data);
  else res.send("fail");
});

//更新分數
router.get("/save", async function (req, res) {
  let q = req.query;
  let data = await db.findOneAndUpdate(
    { "username": q.username },
    { "$set": { "point": q.point, "record": q.record } }
  );
  if(data)res.send("ok")
  else res.send("fail");
});


//排行榜
async function loadFromAltas(){
  var history = []
  let data = []
  let arr = await db.find({}).sort();
  for(let item of arr){
      data.push({
          username: item.username,
          point: item.point,
          record: item.record
      })
  }
  history = data
  return history
}

router.get("/rank", async function (req, res) {
  let re = await loadFromAltas()
    res.json(re)
});

//*
router.get("/0", async function (req, res) {
  res.status(200).send('what???');
});
router.get('/download', (req, res) => res.download('./mouse.pdf'))
module.exports = router;
