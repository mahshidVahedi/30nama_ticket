<template>
  <v-carousel  class="slides" cycle hide-delimiters show-arrows="hover">
    <v-carousel-item class="m-5" v-for="(film, i) in films" :key="i">
      <v-img :src="film.backgraoundPhoto" class="align-center ma-0 pa-0"
        gradient="to bottom, rgba(0,0,0,.6), rgba(0,0,0,.7)" cover>
            <v-row dir="rtl" class="d-flex flex-lg-row flex-xs-column">
              <v-col cols="3">
                <v-responsive :aspect-ratio="16/9">
                <v-img class="mt-10" style="max-height: 300px" :src="film.photo"></v-img>
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
                  <v-btn class="" prepend-icon="mdi-ticket" variant="flat" color="white">
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
export default {
  setup() {
    const films = [
      {
        title: 'فسیل',
        director: 'کریم امینی',
        photo: photoM1,
        score: '4.5/5',
        duration: '85',
        genre: 'کمدی',
        backgraoundPhoto: photoBG1,
        description: "فیلم فسیل به کارگردانی کریم امینی و تهیه‌کنندگی ابراهیم عامریان است. بهرام افشاری، هادی کاظمی، الناز حبیبی، الهه حصاری، ایمان صفا، بابک کریمی، سیدجواد هاشمی و ... در این فیلم کمدی ایفای نقش کرده‌اند."
      },
      {
        title: 'جنگل پرتقال',
        director: ' آرمان خوانساریان',
        photo: photoM2,
        score: '4/5',
        duration: '90',
        genre: 'درام',
        backgraoundPhoto: photoBG2,
        description: "فیلم جنگل پرتقال نویسندگی و کارگردانی آرمان خوانساریان و محصول سال 1401 است. سارا بهرامی، میرسعید مولویان، رضا بهبودی، رضا عموزاد، فراز سرابی، داوود فتحعلی بیگی، فرشته مرعشی، ارشیا نیک‌بین، حمیدرضا عباسی، زینب شعبانی و حسام نورانی بازیگران این فیلم هستند."
      },
      {
        title: 'گیجگاه',
        director: ' عادل تبریزی',
        photo: photoM3,
        score: '2.9/5',
        duration: '105',
        genre: 'عاشقانه',
        backgraoundPhoto: photoBG3,
        description: "فیلم گیج‌گاه نخستین فیلم عادل تبریزی محصول سال 1399 است که در آن بازیگرانی همچون جمشید هاشم‌پور، حامد بهداد، باران کوثری، سروش صحت، فرهاد آییش ایفای نقش می‌کنند. این فیلم در سی‌و‌نهمین جنشواره‌ی فیلم فجر نیز حضور داشت و در دو بخش بهترین تدوین و بهترین کارگردان فیلم اولی، نامزد دریافت سیمرغ شد. "
      }
    ]
    return { films }
  }

}
</script>
