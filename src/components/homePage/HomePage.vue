<template>
  <Navbar :isLoggedIn = isLoggedIn ></Navbar>
  <Slidershow></Slidershow>
  <FilmSection></FilmSection>
  <Footer></Footer>


</template>

<script setup>
import Slidershow from './Slidershow'
import Footer from '../common/Footer.vue'
import FilmSection from './FilmsSection.vue'
import Navbar from '../common/Navbar.vue'
import Login from '../Login/Login.vue'
import Register from '../Login/Register.vue'
import Cinema from '../cinemas/Cinema.vue';
import {ref} from 'vue';
import { useRoute } from 'vue-router'

const isLoggedIn = ref(false)
const route = useRoute()
isLoggedIn.value = route.params.isLoggedIn
// return {isLoggedIn}
</script>
