const express=require("express");
const cors=require("cors");
const axios=require("axios");
const yt=require("./utils/yt");
const ejt=require("./middleware/ejt");

let todo;
(async()=>{todo=await axios.get("https://raw.githubusercontent.com/chito-jp/todo/refs/heads/main/index.html").then(res=>res.data)})();

const app=express();
app.use(cors());
app.use(ejt("views"))

app.get("/",(req,res)=>{
  res.set("Content-Type","text/html").send(todo);
});

app.get("/api/stream/:id",async(req,res)=>{
    try{
        const streamUrl=await yt.getStreamUrl(req.params.id);
        res.send(streamUrl);
    }catch(e){
        res.send("すべてのインスタンスでリクエストが失敗しました");
    }
});

const PORT=process.env.PORT || 7777;
const listener=app.listen(PORT,()=>{console.log(`Server is running on PORT ${listener.address().port}`)});