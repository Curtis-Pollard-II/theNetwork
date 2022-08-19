<template>
    <div class="container bg-secondary text-white">
        <div class="post-title">
            <h4>{{post.Title}}</h4>
        </div>
        <div class="post-img">
            <img :src="post.imgUrl" alt="">
        </div>
        <div class="post-body">
            <p class="fs-5">{{post.body}}</p>
        </div>
        <div class="post-likes">
            <div>{{post.likeIds.length}}</div>
        </div>
    </div>

</template>


<script>
import { Post } from '../models/Post';
export default {
    props: {
        post: {type: Post, required: true}
    },
setup() {
  return {};
},
};
</script>


<style> 

</style>