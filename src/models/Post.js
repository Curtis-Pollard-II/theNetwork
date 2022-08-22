export class Post {
    constructor(data){
        this.imgUrl = data.imgUrl || 'https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png'
        this.body = data.body
        this.creatorId = data.creatorId
        this.creator = data.creator
        this.likeIds = data.likeIds
        this.createdAt = data.createdAt
        this.id = data.id
        
    }
}