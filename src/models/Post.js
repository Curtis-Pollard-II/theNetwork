export class Post {
    constructor(data){
        this.imgUrl = data.imgUrl
        this.body = data.body
        this.creatorId = data.creatorId
        this.creator = data.creator
        this.likeIds = data.likeIds
        this.createdAt = data.createdAt
        this.id = data.id
        
    }
}