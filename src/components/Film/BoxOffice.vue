<template>
  <v-responsive dir="rtl" class="container">
    <div style="width: 60%; margin: auto;">
      <v-data-table-virtual v-for="movie in movies" :key="movie.id" :search="search" sort-by="sortBy" sort-direction="asc" class="mt-4 border-8">
        <template v-slot:item="{ movie }">
          <tr>
            <td>{{ movie.name }}</td>
            <td>{{ movie.salesAmount }}</td>
          </tr>
        </template>
      </v-data-table-virtual>
    </div>
  </v-responsive>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const movies = ref([])
    fetch('http://185.128.40.150:8080/api/salesTable')
      .then(response => response.json())
      .then(data => {
        movies.value = data.movies
      })


    return {
      movies

    };
  },
};
</script>
<style>
.container {
  background-color: #e6e6e6;
}
</style>
