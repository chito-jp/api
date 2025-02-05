const comment=require("./comment");
const detail=require("./details");
const {getHTML}=require("./utils/requester");

const video={
  getComment:comment.getComment,
  getDetails:detail.getDetails,
  getRelatedVideos:detail.getRelatedVideos,
  getInfo:async(id)=>{
    const html=await getHTML(id);
    const videoDetails=detail.getDetailsByHTML(html);
    const commentsData=await comment.getCommentByHTML(html);
    if(!videoDetails||!commentsData)return null;
    return {videoDetails,commentsData}
  },
  getHTML
}

module.exports=video;