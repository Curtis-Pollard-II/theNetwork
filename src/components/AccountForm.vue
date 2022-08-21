<template>
    <form class="card account-form" @submit.prevent="handleSubmit">
    <div class="card-body text-start">
      <div>
        <label for="name">Name:</label>
        <input type="text" class="form-control" v-model="editable.name" required name="name">
      </div>
      <div>
        <label for="picture">Picture:</label>
        <input type="url" class="form-control" v-model="editable.picture" required name="picture" placeholder="picture">
      </div>
      <div>
        <label for="coverImg">Cover Image:</label>
        <input type="url" class="form-control" v-model="editable.coverImg" required name="coverImg">
      </div>
      <div>
        <label for="linkedin">Linkedin Link</label>
        <input type="text" class="form-control" v-model="editable.linkedin" required name="linkedin">
      </div>
      <div>
        <label for="github">Github Link</label>
        <input type="text" class="form-control" v-model="editable.github" required name="github">
      </div>
      <div>
        <label for="graduated">Graduated Status</label>
        <input type="text" class="form-control" v-model="editable.graduated" required name="graduated">
      </div>
      <div>
        <label for="bio">Bio:</label>
        <textarea type="text" class="form-control" v-model="editable.bio" required name="bio" rows="8"
          style="resize:none"></textarea>
      </div>
      <div>
        <button type="submit" class="btn btn-primary w-100 mt-2">Save</button>
      </div>
    </div>
  </form>
</template>
<script>
import { ref, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import { router } from '../router.js';
import { accountService } from '../services/AccountService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {

    const editable = ref({})

    watchEffect(() => {
      if (!AppState.account) { return }
      editable.value = { ...AppState.account }
    })

    return {
      editable,
      async handleSubmit() {
        try {
          await accountService.editAccount(editable.value)
          router.push({ name: 'Profile', params: { profileId: editable.value.id } })
        } catch (error) {
          logger.error('[Editing Account]', error)
          Pop.error(error)
        }
      }
    }
  }
}
</script>
<style> 
</style>