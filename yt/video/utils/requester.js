const axios=require("axios");
const BASE_URL="https://www.youtube.com/watch?v=";

async function getHTML(id){
  try{
    const {data:res}=await axios(BASE_URL+id);
    if(res)return res;
  }catch(e){
    console.error("Error fetching watch page: "+e);
    throw new Error("Failed to fetch watch page");
  }
}

module.exports={getHTML};