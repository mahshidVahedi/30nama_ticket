<template>
  <Navbar ></Navbar>
  <Slidershow></Slidershow>
  <FilmSection></FilmSection>
  <Footer></Footer>


</template>

<script setup>
import Slidershow from '@/components/homePage/SliderShow.vue'
import Footer from '@/components/common/Footer.vue'
import FilmSection from '@/components/homePage/FilmsSection.vue'
import Navbar from '@/components/common/Navbar.vue'
import {ref} from 'vue';
import { useRoute } from 'vue-router'

// const isLoggedIn = ref(false)
// const route = useRoute()
// isLoggedIn.value = route.params.isLoggedIn
// return {isLoggedIn}
</script>
