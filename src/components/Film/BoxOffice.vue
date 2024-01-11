<template>
  <v-responsive dir="rtl" class="container">
    <div style="width: 60%; margin: auto;">
    <v-data-table-virtual
      :items="movies"
      :search="search"
      sort-by="sortBy"
      sort-direction="asc"
      class="mt-4 border-8"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.name }}</td>
          <td>{{ item.total_sales }}</td>
        </tr>
      </template>
    </v-data-table-virtual>
  </div></v-responsive>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {


    return {

    };
  },
};
</script>
<style>
.container{
  background-color: #e6e6e6;
}
</style>
