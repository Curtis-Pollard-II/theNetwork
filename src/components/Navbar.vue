<template>
  <nav class=" container-fluid navbar navbar-expand-lg navbar-dark bg-info px-3">
      <!-- LOGIN COMPONENT HERE -->
    <div class="col-md-1">  
      <Login />
    </div>
    <div class="offset-md-9 col-md-2">
      
        <router-link :to="{ name: 'Search' }">
           <button class="btn btn-primary btn-link btn-outline-dark"><h5>Search Posts</h5> </button>
        </router-link>
      
    </div>

  </nav>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
