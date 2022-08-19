<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    <div class="container-fluid">
      <div class="row bg-info ">
        <div class="p-2 col-md-6" v-for="b in blurbs" :key="b.title">
          <FooterBlurb :blurb="b" />
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from './AppState';
import { blurbsService } from './services/blurbsService';
import { logger } from './utils/Logger';
import Pop from './utils/Pop';

export default {
  name: 'App',
  setup() {
        async function getBlurbs() {
        try {
          await blurbsService.getBlurbs()
        } catch (error) {
          logger.error('getting blurbs', error)
          Pop.toast(error.message, 'error')
        }
    }
        onMounted(() => {
        getBlurbs()
    })
    return {
      appState: computed(() => AppState),
      blurbs: computed(()=> AppState.blurbs)

      

    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";


</style>
