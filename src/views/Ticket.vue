<template>
    <v-app>
      <v-content>
        <router-view>
          <Navbar></Navbar>
          <Ticket></Ticket>
          <Footer></Footer>
        </router-view>
      </v-content>
    </v-app>
  </template>
  
  <style>
  </style>
  
  <script setup>
  import Navbar from '@/components/common/Navbar.vue';
  import Ticket from '@/components/ticket/Ticket.vue';
  import Footer from '@/components/common/Footer.vue';
  </script>