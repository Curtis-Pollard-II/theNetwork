<template>
  <div class="container bg-secondary text-white">
    <div class="row m-2">
      <div class="col-md-5 post-img">
        <img :src="post.imgUrl" alt="" />
      </div>

      <div class="col-md-7">
        <div class="post-body">
          <p class="fs-7">{{ post.body }}</p>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4">
        <p>{{ post.likeIds.length }}</p>
      </div>
      <div class="col-md-4">
        <p>{{ new Date(post.createdAt).toLocaleDateString('pt-BR', {
              month: 'short', day:
                'numeric'
            })
            }}</p>
      </div>
      <div class="col-md-4">
        <p>{{ post.creator.name }}</p>
      </div>
    </div>
  </div>
</template>


<script>
import { Post } from "../models/Post";
export default {
  props: {
    post: { type: Post, required: true },
  },
  setup() {
    return {};
  },
};
</script>


<style>
</style>