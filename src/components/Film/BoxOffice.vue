<template>
  <v-responsive dir="rtl" class="container">
    <div style="width: 60%; margin: auto;">
      <v-data-table-virtual :items="movies" :headers="headers" :search="search" sort-direction="asc" class="mt-4 border-8">
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.name }}</td>
            <td>{{separateWithCommas(item.salesAmount)  }}</td>
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
    function separateWithCommas(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const movies = ref([])
    const headers = [
      { title: 'نام فیلم', value: 'name' },
      { title: 'فروش', value: 'salesAmount' },
    ];
    fetch('https://spweird.fun/api/salesTable')
      .then(response => response.json())
      .then(data => {
        movies.value = data.movies
      })


    return {
      movies,
      headers,
      separateWithCommas

    };
  },
};
</script>
<style>
.container {
  background-color: #e6e6e6;
}
</style>
