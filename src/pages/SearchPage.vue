<template>
  <div>
    <SearchBar />
  </div>

  <div class="container">
    <div class="row d-flex justify-content-center">
      <div class="col-md-7" v-for="(p, index) in posts" :key="index">
        <PostCard :post="p" />
      </div>
    </div>
  </div>
</template>
<script>
import { computed, onMounted } from "@vue/runtime-core";
import { postsService } from "../services/PostsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { AppState } from '../AppState';
export default {
  setup() {
    async function getPostsBySearch() {
      try {
        await postsService.getPostsBySearch();
      } catch (error) {
        logger.error("Getting posts by search from page", error);
        Pop.error(error);
      }
    }
    onMounted(() => {
      getPostsBySearch();
    });

    return {
      posts: computed(() => AppState.searchedPosts),
    };
  },
};
</script>
<style>
</style>