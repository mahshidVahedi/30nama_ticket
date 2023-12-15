<template>
  <Navbar></Navbar>
  <Slidershow></Slidershow>
  <FilmSection></FilmSection>
  <Cinema></Cinema>
  <Footer></Footer>
  <!-- <Login></Login>
  <Register></Register> -->
  <!-- <Verify></Verify> -->
  
</template>

<script setup>
import Slidershow from './Slidershow'
import Footer from '../common/Footer.vue'
import FilmSection from './FilmsSection.vue'
import Navbar from '../common/Navbar.vue';
import Login from '../Login/Login.vue'
import Register from '../Login/Register.vue'
import Verify from '../Login/Verify.vue'
import Cinema from '../cinemas/Cinema.vue';
</script>
