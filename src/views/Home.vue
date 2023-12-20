<template>
  <v-app>
    <v-content>
      <router-view>
        <HomePage></HomePage>
      </router-view>
    </v-content>
  </v-app>
</template>

<style>
@import url('https://fonts.cdnfonts.com/css/iranian-sans');
@import url('https://fonts.googleapis.com/css2?family=Cairo+Play:wght@500&family=Lexend:wght@400;600&family=Outfit&display=swap');

* {
  font-family: 'Iranian Sans', sans-serif;
  letter-spacing: 0rem;
}

#cinematicket {
  font-family: 'Cairo Play', sans-serif;

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
