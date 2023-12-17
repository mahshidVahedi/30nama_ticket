<template>
  <v-container>
    <Navbar></Navbar>
    <v-card>
      <v-card-title>
        <h2>Cinema List</h2>
      </v-card-title>
      <v-list>
        <v-list-item v-for="(cinema, index) in cinemas" :key="index">
          <v-list-item-content>
            <v-list-item-title>{{ cinema.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ cinema.location }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{ cinema.description }}</v-list-item-subtitle>
            <v-list-item-subtitle>Showtimes: {{ cinema.showtimes }}</v-list-item-subtitle>
            <v-list-item-subtitle>Contact: {{ cinema.contact }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import { ref } from 'vue';
import Navbar from '../common/Navbar.vue';

export default {
  setup() {
    const cinemas = ref([
      {
        name: "کوروش",
        location: "تهران",
        description: "",
        showtimes: "",
        contact: "",
      },
      {
        name: "",
        location: "",
        description: "",
        showtimes: "",
        contact: "",
      },
      {
        name: "",
        location: "",
        description: "",
        showtimes: "",
        contact: "",
      },
      // Add more cinema objects as needed
    ]);

    return {
      cinemas,
    };
  },
};
</script>

