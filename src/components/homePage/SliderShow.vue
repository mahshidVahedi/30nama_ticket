<template>
  <v-carousel class="slides" cycle hide-delimiters show-arrows="hover">
    <v-carousel-item class="m-5" v-for="(film, i) in films" :key="i">
      <v-img :src="film.backgraoundPhoto" class="align-center ma-0 pa-0"
        gradient="to bottom, rgba(0,0,0,.6), rgba(0,0,0,.7)" cover>
        <v-row dir="rtl" class="d-flex flex-lg-row flex-xs-column">
          <v-col cols="3">
            <v-responsive :aspect-ratio="16 / 9">
              <v-img class="mt-10 d-none d-sm-flex mr-3" style="max-height: 300px" :src="film.photo"></v-img>
            </v-responsive>

          </v-col>
          <v-col cols="8">
            <v-card dir="rtl" variant="text" class="mx-auto align-center text-white g-0 mr-0">
              <v-card-title class="text-h6 font-weight-bold mb-5" dir="rtl">{{ film.title }}</v-card-title>
              <v-card-text dir="rtl">
                <div class="mt-3 mb-3">
                  کارگردان : {{ film.director }}
                </div>
                <div class="d-flex flex-md-row flex-xs-column mt-3 ">
                  <div class="d-flex flex-row mt-3 me-3 rounded-pill border-white">
                    <v-icon class="me-1 " icon="mdi-clock"></v-icon>
                    {{ film.duration }}
                  </div>
                  <div color="red" class="d-flex flex-row border-white mt-3 me-3">
                    <v-icon class="ms-5" color="red" icon="mdi-heart"></v-icon>
                    <div class="text-red ms-1">
                      {{ film.score }}
                    </div>
                  </div>
                  <div id="genre" class="mt-3 me-3 ms-5">
                    {{ film.genre }}
                  </div>
                </div>
                <div class="mt-5">
                  {{ film.description }}
                </div>
              </v-card-text>
              <v-card-actions class="mt-5 ">
                <v-btn @click="goToFilmDetails(film)" prepend-icon="mdi-ticket" variant="flat" color="white">
                  خرید بلیت
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-img>
    </v-carousel-item>
  </v-carousel>
</template>
<style>
@import url('https://fonts.cdnfonts.com/css/iranian-sans');

* {
  font-family: 'Iranian Sans', sans-serif;
  letter-spacing: 0rem;
}

/* #genre{
  border-color: chartreuse;
} */
</style>
<script lang="js">

import image2 from '@/assets/images/2.jpeg'
import image3 from '@/assets/images/3.jpeg'
import image1 from '@/assets/images/1.jpeg'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const films = [
      {
        id: 3,
        image: image3,
        duration: 152,
        photo: image3,
        backgraoundPhoto: image3,
        background: image3,
        mainPhoto: image3,
        title: "شوالیه تاریکی",
        director: "c2",
        genre: "اکشن",
        score: 5,
        description:"جوکر با نقشه هایش می کوشد تا آرامش شهر را بهم زده و در دل مردم رعب و وحشت بیاندازد تا با اینکار..."

      },
      {
        id: 2,
        image: image2,
        caption: 'پدرخوانده ',
        duration: 175,
        photo: image2,
        background: image2,
        mainPhoto: image2,
        backgraoundPhoto: image2,
        title: 'پدرخوانده ',
        director: 'c2',
        genre: 'جنایی',
        score: 4,
        description: "یک جنایت سازمان یافته..."
      },
      {
        id: 1,
        image: image1,
        caption: 'رستگاری در شاوشنگ',
        duration: 142,
        photo: image1,
        background: image1,
        mainPhoto: image1,
        backgraoundPhoto: image1,
        title: 'رستگاری در شاوشنگ',
        director: 'c1',
        genre: 'درام',
        score: 4,
        description: "دو مرد زندانی طی چند سال با هم پیوند می خورند...",
      }
    ]
    const router = useRouter();

    const goToFilmDetails = (film) => {
      router.push({ name: 'Film', params: { id: film.id } });
    };
    return {
      films,
      goToFilmDetails,
    };
  }

}
</script>
