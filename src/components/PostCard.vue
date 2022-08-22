<template>
  <div class="container bg-secondary text-dark">
    <div class="row">
      <img class="post-img img-fluid col-md-4" :src="post.imgUrl" alt="" />
      <div class="col-md-8">
        <div>
          <p class="fs-5 text-info">
            {{ post.creator.name }}
            
            <router-link :to="{ name: 'Profile', params: { profileId: post.creatorId } }">
              <img :src="post.creator.picture" class="selectable" />
            </router-link>
          </p>
        </div>
        <hr />
        <p class="fs-8">{{ post.body }}</p>
      

      
        <p class="selectable" @click="likePost(post)">
          👍 <b>{{ post.likeIds.length }}</b> 👍
        </p>
        <p class="text-end">{{ new Date(post.createdAt).toLocaleDateString("pt-BR", { month: "short", day: "numeric", }) }}</p>
        

      </div>
    </div>

    <!-- TO DO add conditional v-if statement for delete Button -->
    <button
      v-if="post.creatorId == account.id"
      class="row btn btn-danger"
      @click="deletePost(post)"
    >
      Delete Post
    </button>
  </div>
</template>


<script>
import { ref } from "@vue/reactivity";
import { Post } from "../models/Post";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
import { AppState } from "../AppState";
import { computed } from "@vue/runtime-core";
import { logger } from "../utils/Logger";

export default {
  props: {
    post: { type: Post, required: true },
    // profile: {type: Profile, required: true}
  },
  setup() {
    return {
      account: computed(() => AppState.account),
      async deletePost(post) {
        try {
          const yes = Pop.confirm("delete the Post?");
          if (!yes) {
            return;
          }
          await postsService.deletePost(post.id);
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
      async likePost(postData) {
        try {
          await postsService.likePost(postData);
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>


<style>
.post-img {
  min-height: 200px;
  min-width: 150px;
}
</style>