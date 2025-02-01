const fs=require("fs");
const path=require("path");

function htmlEscape(html){
  return String(html)
  .replace(/</g,"&lt")
  .replace(/>/g,"&gt")
  .replace(/"/g,"&quot")
  .replace(/'/g,"&#39")
  .replace(/&/g,"&amp");
};

function handleTemplate(template,data={}){
  if(typeof template!=="string")throw new Error("テンプレートは文字型のみサポートされています");
  template=template.replace(/@{\s*([A-Za-z_$][0-9A-Za-z_$]*)\s*}/g,(_,v)=>{
    if(v in data){
      if(typeof data[v]=="object"){
        return JSON.stringiry(data[v]);
      }else return htmlEscape(data[v]);
    }
    return "";
  })
  .replace(/@{\s*=([A-Za-z_$][0-9A-Za-z_$]*)\s*}/g,(_,v)=>{
    if(v in data){
      if(typeof data[v]=="object"){
        return JSON.stringify(data[v]);
      }else return data[v];
    }
    return "";
  });
  return template;
}

module.exports=function(pathName){
  return function(req,res,next){
    res.render=function(template,data){
      const result=handleTemplate(template,data);
      res.send(result);
    }
    res.renderFile=function(filePath,data){
      const fullPath=path.join(pathName,`${filePath}.ejt`);
      const template=fs.readFileSync(fullPath,"utf-8");
      const result=handleTemplate(template,data);
      res.send(result);
    };
    next();
  }
};