const axios=require("axios");
const parser=require("./parser");
const requester=require("./requester");
const {getHTML}=require("../utils/requester");

class comment{
  static async getComment(id){
    try{
      const html=await getHTML(id);
      const comments=await comment.getCommentByHTML(html);
      if(comments)return comments;
    }catch(e){
      throw new Error(e.message);
    }
    return null;
  }

  static async getCommentByHTML(html){
    const ContinuationToken=this.getContinuationToken(html);
    if(!ContinuationToken)return null;
    const comments=await requester.requestCommentsJSON(ContinuationToken);
    if(comments)return parser.parse(comments);
    return null;
  }
  
  static getContinuationToken(body){
    const match=body.match(/"itemSectionRenderer".*"token":"([^"]*)".*"targetId":"comments-section"/);
    if(!match)return "";
    return match[1];
  }
  
  static getClient(body){
    const clientName=body.match(/"INNERTUBE_CONTEXT_CLIENT_NAME":(\d*)/)?.[1];
    const clientVersion=body.match(/"INNERTUBE_CONTEXT_CLIENT_VERSION":"([^"]*)"/)[1];
    return [clientName,clientVersion];
  } 
}

module.exports=comment;