const express=require("express");
const cors=require("cors");
const axios=require("axios");
const yt=require("./yt");
const inv=require("./inv")
const ejt=require("./middleware/ejt");
const router=require("./routes/health");
const miniget=require("miniget");

const user_agent=process.env.USER_AGENT||"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36";


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
    try{
        res.json(await yt.video.getInfo(req.params.id));
    }catch(e){
        res.send("リクエストに失敗しました");
    }
});

app.get("/api/comments/:id",async(req,res)=>{
    try{
        res.json(await yt.video.getComment(req.params.id));
    }catch(e){
        res.send("リクエストに失敗しました");
    }
});

app.get("/inv/video/:id",async(req,res)=>{
    try{
        res.json(await inv.getVideoInfo(req.params.id));
    }catch(e){
        res.send("リクエストに失敗しました");
    }
});

app.get("/api/thumbnail/:id",async(req,res)=>{
    const thumbnailUrl="https://i.ytimg.com/vi/${req.params.id}/hqdefault.jpg";
    let stream=miniget(thumbnailUrl,{
          headers: {
              "user-agent": user_agent
          }
      });
    stream.on("error", e => {
          console.error(e);
          res.status(500).send(e.message);
      });
      stream.pipe(res);
  });

app.get("/inv/stream/:id",async(req,res)=>{
    try{
        res.json(await inv.getStreamUrl(req.params.id));
    }catch(e){
        res.send("リクエストに失敗しました");
    }
});


const PORT=process.env.PORT || 7777;
const listener=app.listen(PORT,()=>{console.log(`Server is running on PORT ${listener.address().port}`)});