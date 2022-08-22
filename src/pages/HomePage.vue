<template>
<div>
  <PostForm />
</div>
  <div class="container">
    <div class="row d-flex justify-content-center">
      <div class="col-md-9" v-for="(p, index) in posts" :key="index">
        <PostCard :post="p" />
      </div>
    </div>

    <div class="row d-flex justify-content-between">

      <div class="col-3">
        <button @click="changePage(previousPage)" :disabled="!previousPage">Previous</button>
      </div>
    

      <div class="col-3 text-end">
        <button @click="changePage(nextPage)" :disabled="!nextPage">Next</button>
      </div>

    </div>
  </div>

  
</template>


<script>
import { computed, onMounted } from '@vue/runtime-core';
import { postsService } from '../services/postsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';

export default {
  name:'Home',
  setup(){
    async function getPosts(){
      try {
        await postsService.getPosts()
      } catch (error) {
        logger.error('getting posts', error)
        Pop.toast(error.message, 'error')
      }
    }
    onMounted(() =>{
      getPosts()
      
    })

    return {
      posts: computed(() => AppState.posts),
      nextPage: computed(() => AppState.nextPage),
      previousPage: computed(() => AppState.previousPage),

      async changePage(url){
        try {
          await postsService.changePage(url);
        } catch (error) {
          
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
