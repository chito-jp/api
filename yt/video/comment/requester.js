const axios=require("axios");

class requester{
  static async requestCommentsJSON(continuation){
    const payload={
      context: {
        client: {
          clientName: "WEB",
          clientVersion:"2.20230328.04.00"
        }
      },
      continuation
    }
    try{
      const {data:res}=await axios.post(
        "https://www.youtube.com/youtubei/v1/next?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8",
        payload,
        {
          headers: {
            "Content-Type":"application/json",
            "Accept":"application/json",
            "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
          }
        }
      );
      return res;
    }catch(e){
      console.error("Error fetching comments page:", e);
      throw new Error("Failed to fetch comments page");
    }
  }
}

module.exports=requester;