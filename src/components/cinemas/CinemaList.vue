<template>
  <v-container >
    <v-card class="pa-8">
      <v-card-title>
        <h2 class="text-right mb-6">سینماها</h2>
      </v-card-title>
      <div class="list" dir="rtl">
        <v-row>
          <v-col v-for="cinema in cinemas" :key="cinema.id" cols="12" sm="6" md="4" lg="3">
            <v-card @click="goToCinemaDetails(cinema)" class="cinema-card item">
              <v-img :src="getSrc(cinema.id)" :alt="cinema.name" class="cinema-image"></v-img>
              <v-card-title class="text-right mb-1">{{ cinema.name }}</v-card-title>
              <v-card-text class="text-right mb-1">
                <div class="mb-2"> <v-icon>mdi-map-marker </v-icon> {{ cinema.description }}</div>
                <div> <v-icon size="small">mdi-checkbox-marked-circle</v-icon> {{ cinema.score }} </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue';
import image1 from '@/assets/cinema1/1.jpg'
import image2 from '@/assets/cinema1/2.jpg'
import image3 from '@/assets/cinema1/3.jpg'
import image4 from '@/assets/cinema1/4.jpg'
import image5 from '@/assets/cinema1/5.jpg'
import image6 from '@/assets/cinema1/6.jpg'
import image7 from '@/assets/cinema1/7.jpg'
import image8 from '@/assets/cinema1/8.jpg'
import '@mdi/font/css/materialdesignicons.css'
import { useRouter } from 'vue-router';


export default {
  setup() {

    const cinemas = ref([])
    fetch('http://185.128.40.150:8080/api/cinemas')
      .then(response => response.json())
      .then(data => cinemas.value = data.cinemas)
    const router = useRouter();
    const goToCinemaDetails = (cinema) => {
      router.push({ name: 'Details', params: { id: cinema.id } });
    };

    const getSrc = (id) => {
      const src = `/src/assets/cinema1/${id}.jpeg`
      return src;
    }

    // Fetch data using an asynchronous function

    // const fetchData = async () => {
    //   try {
    //     const response = await fetch('http://localhost:8080/api/cinemas');
    //     const data = await response.json();
    //     cinemas.value = data;
    //     console.log(cinemas)
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    // // Fetch data when the component is mounted
    // onMounted(() => {
    //   fetchData();
    // });


    console.log(cinemas)
    return {
      cinemas, goToCinemaDetails, getSrc
    };
  },
};
</script>

<style scoped>
.cinema-card {
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.text-right {
  text-align: right;
}

.cinema-image {
  object-fit: cover;
  height: 200px;
  width: 100%;
}

.item {
  transition: transform .2s;
}

.item:hover {
  transform: scale(1.1);
}
</style>
