const express=require("express");
const router=express.Router();
const inv=require("../inv");

router.get("/video/:id",async(req,res)=>{
    try{
        res.json(await inv.getVideoInfo(req.params.id));
    }catch(e){
        res.send("リクエストに失敗しました");
    }
});

router.get("/stream/:id",async(req,res)=>{
    try{
        res.send(await inv.getStreamUrl(req.params.id));
    }catch(e){
        res.send("リクエストに失敗しました");
    }
});

router.get("/redirect/:id",async(req,res)=>{
  try{
    res.redirect(await inv.getStreamUrl(req.params.id))
  }catch(e){
    res.send("リクエストに失敗しました");
  }
})

module.exports=router;