<template>
  <div class="container bg-light text-dark">
    <div class="row">
      <img class="post-img" :src="post.imgUrl" alt="" />
      <p>{{ post.creator.name }}</p>
      <p class="fs-8">{{ post.body }}</p>
    </div>

    <div class="row">
      <div class="col-md-4">
        <p class="selectable" @click="likePost(post)">
          {{ post.likeIds.length }}
        </p>
      </div>
      <div class="col-md-4">
        <p>
          {{
            new Date(post.createdAt).toLocaleDateString("pt-BR", {
              month: "short",
              day: "numeric",
            })
          }}
        </p>
      </div>
      <div class="col-md-4">
        <router-link
          :to="{ name: 'Profile', params: { profileId: post.creatorId } }"
        >
          <img :src="post.creator.picture" class="selectable" />
        </router-link>
      </div>
      <!-- TO DO add conditional v-if statement for delete Button -->
      <button
        v-if="post.creatorId == account.id"
        class="btn btn-danger"
        @click="deletePost(post)"
      >
        delete me
      </button>
    </div>
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
    const editing = ref(false);
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
  min-width: 200px;
}
</style>