const express=require("express");
const router=express.Router();
const yt=require("../yt");
const miniget=require("miniget");
const user_agent=require("../config/ua");

router.get("/video/:id",async(req,res)=>{
    try{
        res.json(await yt.video.getInfo(req.params.id));
    }catch(e){
        res.send("リクエストに失敗しました");
    }
});

router.get("/comments/:id",async(req,res)=>{
    try{
        res.json(await yt.video.getComment(req.params.id));
    }catch(e){
        res.send("リクエストに失敗しました");
    }
});

router.get("/thumbnail/:id",async(req,res)=>{
  const thumbnailUrl=`https://i.ytimg.com/vi/${req.params.id}/hqdefault.jpg`;
  console.log(thumbnailUrl);
  let stream=miniget(thumbnailUrl,{
		headers: {
			"user-agent": user_agent
		}
	});
  stream.on("error", e => {
		console.error(e);
		res.status(500).send(e);
	});
	stream.pipe(res);
});

module.exports=router;