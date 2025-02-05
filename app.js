const express=require("express");
const cors=require("cors");
const axios=require("axios");
const ejt=require("./middleware/ejt");
const healthRouter=require("./routes/health");
const apiRouter=require("./routes/apiRoutes");
const invRouter=require("./routes/invRoutes");

let todo;
(async()=>{todo=await axios.get("https://raw.githubusercontent.com/chito-jp/todo/refs/heads/main/index.html").then(res=>res.data)})();

async function request(url,option){
  if(!url)return null;
  let res;
  try{
    if(!option)res=await axios.get(url);
    else res=await axios({...option,url});
    if(res)return res.data;
  }catch(e){}
  return null;
}

const app=express();
app.use(cors());
app.use(ejt("views"))
app.use("/health",healthRouter);
app.use("/api",apiRouter);
app.use("/inv",invRouter)

app.get("/",(req,res)=>{
  res.set("Content-Type","text/html").send(todo);
});

const PORT=process.env.PORT || 7777;
const listener=app.listen(PORT,()=>{console.log(`Server is running on PORT ${listener.address().port}`)});