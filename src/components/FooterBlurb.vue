<template>
  <div class="img-fluid  img p-2">
    <img :src="blurb.banner" alt="">
  </div>
</template>



<script>
import { Blurb } from '../models/Blurb';

export default {

    props: {
        blurb: { type: Blurb, required: true }
    },
    setup() {




     return {};
    },
};
</script>


<style>
img{
    height: 75px;
}

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

</style>