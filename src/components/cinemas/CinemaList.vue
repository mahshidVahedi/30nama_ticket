<template>
  <v-container>
    <v-card>
      <v-card-title>
        <h2 class="text-right mb-6">سینماها</h2>
      </v-card-title>
      <div class="list">
      <v-row >
        <v-col v-for="(cinema, index) in cinemas" :key="index" cols="12" sm="6" md="4" lg="3">
          <v-card class="cinema-card item">
            <v-img :src="cinema.image" :alt="cinema.name" class="cinema-image"></v-img>
            <v-card-title class="text-right mb-1">{{ cinema.name }}</v-card-title>
            <v-card-text class="text-right mb-1">
              <div class="mb-2">{{ cinema.location }} <v-icon>mdi-map-marker</v-icon></div>
              <div>{{ cinema.score }} <v-icon size="small">mdi-checkbox-marked-circle</v-icon> </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row></div>
    </v-card>
  </v-container>
</template>

<script>
import { ref } from 'vue';
import image1 from '@/assets/cinema1/1.jpg'
import image2 from '@/assets/cinema1/2.jpg'
import image3 from '@/assets/cinema1/3.jpg'
import image4 from '@/assets/cinema1/4.jpg'
import image5 from '@/assets/cinema1/5.jpg'
import image6 from '@/assets/cinema1/6.jpg'
import image7 from '@/assets/cinema1/7.jpg'
import image8 from '@/assets/cinema1/8.jpg'
import '@mdi/font/css/materialdesignicons.css'

export default {
  setup() {
    const cinemas = ref([
      {
        name: ' پردیس سینمایی کوروش',
        location: 'اتوبان همت غرب، ستاری شمال',
        score: '3.6',
        image: image1,
      },
      {
        name: 'پردیس سینمایی ایران مال',
        location: 'اتوبان همت غرب، اتوبان خرازی',
        score: '4.0',
        image: image2,
      },
      {
        name: 'پردیس سینمایی آزادی',
        location: 'خیابان بهشتی',
        score: '3.3',
        image: image3,
      },
      {
        name: 'پردیس سینمایی ملت',
        location: 'خیابان ولیعصر، بزرگراه نیایش',
        score: '3.3',
        image: image5,
      },
      {
        name: 'پردیس سینمایی شمیران',
        location: 'اقدسیه، بلوار ارتش',
        score: '4.4',
        image: image4,
      },
      {
        name: 'سینما فرهنگ تهران',
        location: 'خیابان شریعتی، مترو قلهک',
        score: '3.7',
        image: image6,
      },
      {
        name: 'پردیس سینمایی زندگی',
        location: 'صادقیه، بلوار کاشانی',
        score: '3.3',
        image: image8,
      },
      {
        name: 'پردیس سینمایی راگا',
        location: 'شهرری، اتوبان آوینی',
        score: '3.2',
        image: image7,
      },
    ]);

    return {
      cinemas,
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
.item{
  transition: transform .2s;
}
.item:hover{
  transform: scale(1.1);
}
</style>
