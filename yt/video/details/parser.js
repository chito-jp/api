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
    videoDetails.owner={};
    videoDetails.owner.name=owner.title.runs[0].text;
    videoDetails.owner.channelId=owner.navigationEndpoint.browseEndpoint.browseId;
    videoDetails.owner.avatarUrl=owner.thumbnail.thumbnails.at(-1).url
  }
  videoDetails.description = secondaryRenderer?.videoSecondaryInfoRenderer?.attributedDescription?.content||"説明なし";

  videoDetails.relatedVideos=parser.parseRelatedVideos(initialData);
  return videoDetails;
}

static parseRelatedVideos(initialData){
  const relatedVideos=[];
  const secondaryResults=initialData.contents.twoColumnWatchNextResults.secondaryResults?.secondaryResults?.results||[];

  for (const video of secondaryResults) {
    if(video.compactVideoRenderer) {
      const {compactVideoRenderer}=video;
      relatedVideos.push({
        title: compactVideoRenderer.title.simpleText,
        videoId: compactVideoRenderer.videoId,
        thumbnail:compactVideoRenderer?.thumbnail?.thumbnails.at(-1).url,
        length: compactVideoRenderer.lengthText?.simpleText||"不明",
        views: compactVideoRenderer.viewCountText?.simpleText||"不明",
        published:compactVideoRenderer.publishedTimeText||"不明",
        owner:{
          name:compactVideoRenderer?.longBylineText?.runs[0]?.text||"不明",
          id:compactVideoRenderer?.longBylineText?.runs[0]?.navigationEndpoint?.browseEndpoint?.browseId,
          url:compactVideoRenderer?.longBylineText?.runs[0]?.navigationEndpoint?.browseEndpoint?.canonicalBaseUrl,
          avatarUrl:compactVideoRenderer.channelThumbnail.thumbnails[0].url
        }
      });
    }
  }
  return relatedVideos;
}
}

module.exports=parser;