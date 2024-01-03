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
import photoBG1 from '@/assets/fosilBG.jpg'
import photoM1 from '@/assets/fosilM.jfif'
import photoBG2 from '@/assets/Jangale-Porteghal-8.jpg'
import photoM2 from '@/assets/jangal.jfif'
import photoBG3 from '@/assets/gijgahBG.jpeg'
import photoM3 from '@/assets/gijgah.jfif'
import image2 from '@/assets/images/jangal.jpeg'
import image3 from '@/assets/images/fosil.jpeg'
import image4 from '@/assets/images/gijgah.jpeg'
import photoA1 from '@/assets/Film1/ac1.jpg';
import photoA2 from '@/assets/Film1/ac2.jpg';
import photoA3 from '@/assets/Film1/ac3.jpg';
import { useRouter } from 'vue-router'
export default {
  setup() {
    const films = [
      {
        id: 3,
        image: image2,
        duration: 152,
        photo: photoM2,
        backgraoundPhoto: photoBG2,
        background: photoBG2,
        mainPhoto: image2,
        title: "The Dark Knight",
        director: "c2",
        genre: "Action",
        score: 5,
        description:"When the menace known as the Joker wreaks..."
        
      },
      {
        id: 2,
        image: image3,
        caption: 'The Godfather',
        duration: 175,
        photo: photoM1,
        background: image3,
        mainPhoto: image3,
        backgraoundPhoto: photoBG1,
        title: 'The Godfather',
        director: 'c2',
        genre: 'Crime',
        score: 4,
        description: "An organized crime..." 
      },
      {
        id: 1,
        image: image4,
        caption: 'The Shawshank Redemption',
        duration: 142,
        photo: photoM3,
        background: photoBG3,
        mainPhoto: image4,
        backgraoundPhoto: photoBG3,
        title: 'The Shawshank Redemption',
        director: 'c1',
        genre: 'Drama',
        score: 4,
        description: "Two imprisoned men bond over a number of years..",    
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
