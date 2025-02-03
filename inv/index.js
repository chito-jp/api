const axios=require("axios");
const fs=require("fs");
const path=require("path");
const {instances}=require("./config/instances");
const parser=require("./parser");

class inv{
    static async getStreamUrl(id){
        for(const instance of instances.stream){
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
        throw new Error("すべてのインスタンスのリクエストが失敗しました");
      }

    static async getVideoInfo(id){
        let ret;
        try{
          ret=await inv.getInfoMain(id);
          if(ret)return ret;
        }catch(e){}
        try{
          ret=await inv.getInfoSub(id);
          if(ret)return ret;
        }catch(e){}
        throw new Error("情報の取得に失敗しました");
    }

    static async getInfoMain(id){
        for(const instance of instances.sub){
          const url=instance+id;
          try{
            const {data:res}=await axios.get(url);
            if(res)return parser.parseHTML(res,id);
          }catch(e){
            console.error("Error: "+url+" - "+e.message);
          }
        }
        throw new Error("情報の取得に失敗しました");
    }

    static async getInfoSub(id){
        for(const instance of instances.main){
          const url=instance+"/api/v1/videos/"+id;
          try{
            const {data:res}=await axios.get(url);
            if(res)return JSON.parse(res);
          }catch(e){
            console.error("Error: "+url+" - "+e.message);
          }
        }
      throw new Error("すべてのインスタンスのリクエストが失敗しました");
    }
}

module.exports=inv;