<template>
  <div class="profile-page" v-if="profile">

    <div class="cover-img">
      <div class="position-absolute " style="right:0" v-if="profile.id == account.id">
        <router-link class="btn square btn-warning " :to="{ name: 'Account' }">Edit Account</router-link>
      </div>
      <img :src="profile.picture" alt="">
      <h3>{{ profile.name }}</h3>
      <p>{{ profile.bio }}</p>
      <p>{{ profile.github }}</p>
      <p>{{ profile.linkedin }}</p>
      <p>{{ profile.class }}</p>
      <p v-if="profile.graduated">Graduated</p>
        <p v-else>😿Not Graduated😿</p>

    </div>

  <div class="container">
      <div class="row d-flex justify-content-center">
      <div class="col-md-7" v-for="(p, index) in posts" :key="index">
        <PostCard :post="p" /> 
      </div>
    </div>
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

</template>


<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { router } from '../router.js';
import { profilesService } from '../services/ProfilesService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/postsService.js';

export default {
  setup() {

    const route = useRoute()

    async function getPostsByCreatorId() {
      try {
        await postsService.getPostsByCreatorId(route.params.profileId)
      } catch (error) {
        logger.error('GettingProfilePosts', error)
        Pop.error(error)
      }
    }

    async function getProfileById() {
      try {
        await profilesService.getProfileById(route.params.profileId)
      } catch (error) {
        logger.error('GettingProfile', error)
        Pop.error(error)
        router.push({ name: 'Home' })
      }
    }

    onMounted(() => {
      getProfileById()
      getPostsByCreatorId()
    })


    return {
      account: computed(() => AppState.account),
      profile: computed(() => AppState.activeProfile),
      cover: computed(() => `url(${AppState.activeProfile?.coverImg || 'https://cdn.pixabay.com/photo/2017/07/16/17/33/background-2509983_1280.jpg'})`),
      posts: computed(() => AppState.profilePosts),
      nextPage: computed(() => AppState.nextPage),
      previousPage: computed(() => AppState.previousPage),
      
      async changePage(url){
        try {
          await postsService.changeProfilePage(url)
        } catch (error) {
          
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.cover-img {
  height: 300px;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  display: grid;
  place-content: center;
  color: aliceblue;
  background-image: v-bind(cover);
}
</style>
