<template>
  <div class="container">
    <form @submit.prevent="handleSubmit">
      <p class="text-center fs-5"><b>  Create a post </b></p>
      <div class="row form-control d-flex justify-content-between">
        <input class="col-md-3" type="text" placeholder="body" v-model="editable.body" />
        <input class="col-md-3" type="text" placeholder="image url" v-model="editable.imgUrl" />
        <button class="col-md-3 btn btn-primary">{{ editable.id ? 'Save' : 'Create' }}</button>
      </div>
    </form>
  </div>
</template>


<script>
import { postsService } from '../services/PostsService.js';
import { ref, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';


export default {
  setup() {

    const editable = ref({})

    watchEffect(() => {
      if (!AppState.activePost) { return }
      editable.value = { ...AppState.activePost }
    })

    return {
      editable,
      async handleSubmit() {
        try {
          if (editable.value.id) {
            await postsService.editPost(editable.value)
            Pop.success('Post Edited')
          } else {
            await postsService.createPost(editable.value)
            Pop.success('Great Job... You created a post!!!')
          }
          editable.value = {}
        } catch (error) {
          logger.error('Create or Edit Post', error)
          Pop.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>
