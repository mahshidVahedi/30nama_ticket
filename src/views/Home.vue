<template>
  <v-app>
      <router-view>
        <HomePage></HomePage>
      </router-view>
  </v-app>
</template>

<style>
/* @import url('https://fonts.cdnfonts.com/css/iranian-sans');
@import url('https://fonts.googleapis.com/css2?family=Cairo+Play:wght@500&family=Lexend:wght@400;600&family=Outfit&display=swap'); */
@font-face {
    font-family: vazirNormal;
    src: url('../../public/assets/fonts/vaizr.eot');
    src: url('../../public/assets/fonts/vazir.eot?#iefix') format('embedded-opentype'), url('../../public/assets/fonts/vazir.woff2') format('woff2'), url('../../public/assets/fonts/vazir.woff') format('woff'), url('../../public/assets/fonts/vazir.ttf') format('truetype');
    font-weight: normal;
    font-display: auto;
}
* {
  font-family: vazirNormal, sans-serif;
  letter-spacing: 0rem;
}

#cinematicket {
  font-family: vazirNormal, sans-serif;

}

::-webkit-scrollbar {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #ff3543;
  border-radius: 1em;
}
</style>

<script setup>
import HomePage from '@/components/homePage/HomePage.vue'


</script>
