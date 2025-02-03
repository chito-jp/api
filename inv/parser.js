class parser{
    static parseHTML(html,id){
      const regs=[/<meta\s+property="og:title"\s+content="([^"]+)"/,/<meta\s+name="description"\s+content="([^"]+)"/,/<meta\s+name="keywords"\s+content="([^"]+)"/,/<meta\s+property="og:video"\s+content="([^"]+)"/];
      const [title,description,keywords,streamUrl]=regs.map(reg=>{
        const match=html.match(reg);
        if(match)return match[1];
        return "";
      });
      return {
        title,
        id,
        thumbnail:`https://img.youtube.com/vi/${id}/0.jpg`,
        description,
        keywords:keywords.split(","),
        streamUrl
      }
    }
  }
  
  module.exports=parser;