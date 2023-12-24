<template>
  <v-app>
    <v-content>
      <router-view>
        <Navbar></Navbar>
        <Payment></Payment>
        <Footer></Footer>
      </router-view>
    </v-content>
  </v-app>
</template>

<style>
</style>

<script setup>
import Navbar from '@/components/common/Navbar.vue';
import Payment from '@/components/payment/Payment.vue';
import Footer from '@/components/common/Footer.vue';
</script>