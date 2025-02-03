const {getHTML}=require("../utils/requester");
const parser=require("./parser");

class detail{
  static async getDetails(id){
    const html=await getHTML(id);
    const videoDetails=detail.getDetailsByHTML(html);
    return videoDetails;
  }
  
  static getDetailsByHTML(html){
    const ytInitialData=detail.getYtInitialData(html);
    if(!ytInitialData)return null;
    const videoDetails=parser.parseInitialData(ytInitialData);
    return videoDetails;
  }

  static getYtInitialData(body){
    const match=body.match(/ytInitialData\s*=\s*({.*?});/)||body.match(/window\["ytInitialData"\]\s*=\s*({.*?});/);
    if(!match)return {};
    try{
      return JSON.parse(match[1]);
    }catch(e){
      console.error("JSONの解析に失敗しました");
    }
    return {};
  }
  
  static getYtInitialPlayerResponse(body){
    const match=body.match(/ytInitialPlayerResponse\s*=\s*({.*?});/);
    if(!match)return {};
    try{
      return JSON.parse(match[1]);
    }catch(e){
      console.error("JSONの解析に失敗しました");
    }
    return {};
  }
}

module.exports=detail;