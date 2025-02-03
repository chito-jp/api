class parser{
    static parseInitialData(initialData){
      const videoDetails={};
    const contents=initialData?.contents?.twoColumnWatchNextResults?.results?.results?.contents||
          initialData?.contents?.twoColumnWatchNextResults?.results?.contents;
    const primaryRenderer=contents.find(
      (content) => content.videoPrimaryInfoRenderer
    );
    if(primaryRenderer){
      const videoInfo = primaryRenderer.videoPrimaryInfoRenderer;
  
      videoDetails.title = videoInfo.title.runs[0].text; // 動画タイトル
      videoDetails.viewCount = videoInfo.viewCount.videoViewCountRenderer?.viewCount?.simpleText || "不明"; // 再生回数
      videoDetails.uploadDate = videoInfo.dateText?.simpleText || "不明";
    }
    const secondaryRenderer=contents.find(
      (content) => content.videoSecondaryInfoRenderer
    );
    if (secondaryRenderer) {
      const owner = secondaryRenderer.videoSecondaryInfoRenderer.owner.videoOwnerRenderer;
      videoDetails.channelName = owner.title.runs[0].text;
      videoDetails.channelId = owner.navigationEndpoint.browseEndpoint.browseId;
    }
    videoDetails.description = secondaryRenderer?.videoSecondaryInfoRenderer?.attributedDescription?.content||"説明なし";
    const relatedVideos=[];
    const secondaryResults=initialData.contents.twoColumnWatchNextResults.secondaryResults?.secondaryResults?.results||[];
  
    for (const video of secondaryResults) {
      if (video.compactVideoRenderer) {
        const {compactVideoRenderer}=video;
        relatedVideos.push({
          title: compactVideoRenderer.title.simpleText,
          videoId: compactVideoRenderer.videoId,
          thumbnails:compactVideoRenderer?.thumbnail?.thumbnails,
          length: compactVideoRenderer.lengthText?.simpleText||"不明",
          views: compactVideoRenderer.viewCountText?.simpleText||"不明",
          published:compactVideoRenderer.publishedTimeText||"不明",
          owner:{
            name:compactVideoRenderer?.longBylineText?.runs[0]?.text||"不明",
            id:compactVideoRenderer?.longBylineText?.runs[0]?.navigationEndpoint?.browseEndpoint?.browseId,
            url:compactVideoRenderer?.longBylineText?.runs[0]?.navigationEndpoint?.browseEndpoint?.canonicalBaseUrl
          }
        });
      }
    }
  
    videoDetails.relatedVideos=relatedVideos;
    return videoDetails;
    }
  }
  
  module.exports=parser;