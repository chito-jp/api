const express=require("express");
const router=express.Router();
const FreeDNS=require("../freeDNS");

router.get("/",async(req,res)=>{
    res.render("domains",{domains:(await FreeDNS.getRegistry(req.query?.page)).map(item=>`<a target="_blank" rel="noopener noreferrer" href="${item}">${item}<br></a>`).join("")});
})

module.exports=router;