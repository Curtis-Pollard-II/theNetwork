<template>
    <div class="search-form">
        <form @submit.prevent="searchPosts">
            <input type="text" class="form-control" required v-model="query" />
            <button type="submit" class="rounded bg-dark text white">Search</button>
        </form>
    </div>

</template>

<script>
import { ref } from '@vue/reactivity';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { postsService } from '../services/PostsService';
export default {
setup() {
    const query = ref('')
  return {
    query,
    async searchPosts(){
        try {
          await postsService.getPostsBySearch(query.value)
          query.value = ''
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
    }
  };
},
};
</script>

<style> 
</style>