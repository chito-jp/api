const axios=require("axios");

const BASE_URL="https://freedns.afraid.org";

class FreeDNS{
    static async getRegistry(page=1){
        const url=`${BASE_URL}/domain/registry/page-${page}.html`;
        const headers={
            "Host": "freedns.afraid.org",
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5",
            "Accept-Encoding": "gzip, deflate",
            "Connection": "keep-alive",
            "Upgrade-Insecure-Requests": "1",
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0"
        };
        try{
            const {data:res}=await axios.get(url,{headers});
            const match=res.match(/href\s*=\s*["']?[^"'>]+["']?\s*>website</g);
            if(!match)return null;
            const urls=match.map(item=>item.match(/href\s*=\s*["']?([^"'>]+)["']?/)?.[1]).filter(Boolean);
            return urls;
        }catch(e){
            console.error(e);
            throw new Error("Faild fetch.");
        }
    }
}

module.exports=FreeDNS;