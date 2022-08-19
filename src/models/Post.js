export class Post {
    constructor(data){
        this.imgUrl = data.imgUrl
        this.body = data.body
        this.creatorId = data.creatorId
        this.likeIds = data.likeIds
        
    }
}