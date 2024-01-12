<template>
  <div class="mt-10" dir="rtl">
    <h3 style="margin-right: 10%; direction: rtl; margin-bottom: 10px;">
      فیلم های به روز
    </h3>
    <section class="ma-auto" style="width: 80%; height: 900px;">
      <v-list>

        <v-list-item @click="goToFilmDetails(film)" v-for="film in films" :key="film.id"
          style="display: inline-block;" class="item">
          <v-list-item-avatar>
            <v-img :src="getSrc(film.id)" :alt="film.name" width="200px" height="auto"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title style="color: black;">{{ film.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </section>

  </div>

</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
export default {
  setup() {


    const films = ref([])
      fetch('https://nramezon.shop/api/movies')
        .then(response => response.json())
        .then(data => films.value = data.movies)
    const router = useRouter();

    const goToFilmDetails = (film) => {
      router.push({ name: 'Film', params: { id: film.id } });
    };

      const getSrc = (id) => {
          const src = `../assets/images/${id}.jpeg`
          return src;
      }

    return {
      films, goToFilmDetails,getSrc
    };
  }
};
</script>
<style>
.item {
  transition: transform .2s;
  margin-bottom: 15%;
}

.item:hover {
  transform: scale(1.1);
}
</style>
