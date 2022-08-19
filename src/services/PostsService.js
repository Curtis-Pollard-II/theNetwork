import { AppState } from "../AppState"
import { Post } from "../models/Post"
import { logger } from "../utils/Logger"
import { bcwSandbox } from "./AxiosService"
class PostsService {
    async getPosts(){
        const res = await bcwSandbox.get('api/posts')
        logger.log('getting posts from the service', res.data)
        logger.log ('posts please', res.data.posts)
        AppState.nextPage = res.data.newer
        AppState.previousPage = res.data.older
        logger.log(AppState.nextPage, 'next page')
        logger.log(AppState.previousPage, 'previous')
        AppState.posts = res.data.posts.map(p => new Post(p))
        logger.log('got posts')
    }

    async createPost(postData) {
        const res = await bcwSandbox.post('api/posts', postData)
        AppState.posts.unshift(new Post(res.data))
    }

    async changePage(url) {
        logger.log(url)
        const res = await bcwSandbox.get(url)
        AppState.posts = res.data.posts.map(p=>new Post(p))
        logger.log('posts', AppState.posts)
        AppState.nextPage = res.data.newer
        AppState.previousPage = res.data.older
    }

    
        


}

export const postsService = new PostsService()