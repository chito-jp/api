const express=require("express");
const cors=require("cors");
const axios=require("axios");
const yt=require("./yt");
const inv=require("./inv")
const ejt=require("./middleware/ejt");
const router=require("./routes/health");

let todo;
(async()=>{todo=await axios.get("https://raw.githubusercontent.com/chito-jp/todo/refs/heads/main/index.html").then(res=>res.data)})();

const app=express();
app.use(cors());
app.use(ejt("views"))
app.use("/health",router)

app.get("/",(req,res)=>{
  res.set("Content-Type","text/html").send(todo);
});

app.get("/api/video/:id",async(req,res)=>{
    res.json(await yt.video.getInfo(req.params.id));
});

app.get("/api/comments/:id",async(req,res)=>{
    res.json(await yt.video.getComment(id));
});

app.get("/inv/video/:id",async(req,res)=>{
    res.json(await inv.getVideoInfo(req.params.id));
});

app.get("/inv/stream/:id",async(req,res)=>{
    res.json(await inv.getStreamUrl(req.params.id));
});

const PORT=process.env.PORT || 7777;
const listener=app.listen(PORT,()=>{console.log(`Server is running on PORT ${listener.address().port}`)});