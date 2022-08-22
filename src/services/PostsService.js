import { AppState } from "../AppState"
import { Post } from "../models/Post"
import { logger } from "../utils/Logger"
import { bcwSandbox } from "./AxiosService"
class PostsService {
    async getPosts() {
        const res = await bcwSandbox.get('api/posts')
        logger.log('getting posts from the service', res.data)
        logger.log('posts please', res.data.posts)
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
        AppState.posts = res.data.posts.map(p => new Post(p))
        logger.log('posts', AppState.posts)
        AppState.nextPage = res.data.newer
        AppState.previousPage = res.data.older
    }
    async changeProfilePage(url) {
        logger.log(url)
        const res = await bcwSandbox.get(url)
        AppState.profilePosts = res.data.posts.map(p => new Post(p))
        logger.log('posts', AppState.profilePosts)
        AppState.nextPage = res.data.newer
        AppState.previousPage = res.data.older
    }
    async getPostsByCreatorId(creatorId) {
        const res = await bcwSandbox.get('api/posts', {
            params: {
                creatorId
            }
        })
        // logger.log('creater Id Posts in the service', res.data)
        AppState.nextPage = res.data.newer
        AppState.previousPage = res.data.older
        logger.log(AppState.nextPage, 'next page')
        logger.log(AppState.previousPage, 'previous')
        AppState.profilePosts = res.data.posts.map(p => new Post(p))
    }

    async deletePost(postId) {
        const res = await bcwSandbox.delete(`api/posts/${postId}`)
        AppState.posts = AppState.posts.filter(p => p.id != postId)
    }

    async getPostsBySearch(searchText) {
        const res = await bcwSandbox.get('api/posts', {
            params: {
                query: searchText
            }
        })
        logger.log(res.data.posts, 'searched posts')
        AppState.posts = res.data.posts.map(m => new Post(m))
    }

    async likePost(postData){
        let res = await bcwSandbox.post(`api/posts/${postData.id}/like`)
        let postLike = new Post(res.data)
        let postIndex = AppState.posts.findIndex(p => p.id == postData.id)
        AppState.posts.splice(postIndex, 1, postLike)
    }







}

export const postsService = new PostsService()