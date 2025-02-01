const axios=require("axios");
const fs=require("fs");
const path=require("path");

const instances=JSON.parse(fs.readFileSync(path.join(__dirname,"instances.json")));
async function getStreamUrl(id){
  for(const instance of instances){
    const fullUrl=instance.url+id;
    try{
      const {data:res}=await axios.get(fullUrl,{timeout:3000});
      let url;
      if(typeof instance.type=="undefined"){
        const match=res.match(/<meta\s+property="og:video"\s+content="([^"]+)"\s*\/?>/);
        if(match)url=match[1];
      }else{
        url=res;
      }
      if(url)return url;
      console.error("ストリームURLが存在しない - "+fullUrl);
    }catch(e){
      if (e.response && e.response.status === 302 && instance.pid === 0) {
          console.error(`リダイレクト先のURLの取得を試みています...: ${instance.url}`);
          const redirectUrl = e.response.headers.location;
          return redirectUrl;
      }
      console.error("error :"+fullUrl+" - "+e.message);
    }
  }
  throw new Error("すべてのURLのリクエストが失敗しました");
}

const yt={getStreamUrl};
module.exports=yt;