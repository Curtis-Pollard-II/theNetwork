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
        <router-link :to="{ name: 'Profile', params: { profileId: post.creatorId } }">
          <p class="selectable">{{ post.creator.name }}</p>
        </router-link>
      </div>
    </div>
    <div v-if="post.creatorId == account.id">
        <router-link :to="{ name: 'Profile', params: { profileId: post.creatorId } }">
          <p class="selectable">{{ post.creator.name }}</p>
        </router-link>
    </div>
  </div>
</template>


<script>
import { ref } from '@vue/reactivity';
import { Post } from "../models/Post";
import { AppState } from '../AppState';
export default {
  props: {
    post: { type: Post, required: true },
  },
  setup() {

    const editing = ref(false)
    return {
      editing,
      account: computed(() => AppState.account),
      toggleEdit(){
        AppState.activePost = props.post
        this.editing = !this.editing
      }
    };
  },
};
</script>


<style>
</style>