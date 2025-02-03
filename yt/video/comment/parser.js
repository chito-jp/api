class parser{
    static parse(dt){
      dt=dt?.frameworkUpdates?.entityBatchUpdate?.mutations
      const comments=[];
      if(dt&&Array.isArray(dt)){
        dt.forEach(item=>{
          if(item.payload&&item.payload.commentEntityPayload){
            const payload=item.payload.commentEntityPayload;
            const commentData={
              commentId:payload.properties.commentId,
              content:payload.properties.content.content,
              author:{
                displayName:payload.author.displayName,
                id:payload.author.channelId,
                avatarUrl:payload.author.avatarThumbnailUrl,
                isVerified:payload.author.isVerified
              },
              engagement:{
                likeCount:payload.toolbar.likeCountNotliked,
                replyCount:payload.toolbar.replyCount
              },
              attachments:(payload.properties.content.attachmentRuns||[]).map(attachment=>{
                return {
                  type: attachment.element.type.imageType?"emoji":"unknown",
                  imageUrl:attachment.element.type.imageType ? attachment.element.type.imageType.image.sources[0].url:null,
                  label:attachment.element?.properties?.accessibilityProperties?.label
                }
              })
            };
            comments.push(commentData);
          }
        });
      }
      return comments;
    }
  }
  
  module.exports=parser;