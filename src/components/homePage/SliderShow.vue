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
        id: 2,
        image: image2,
        caption: 'جنگل پرتقال',
        duration: 90,
        photo: photoM2,
        backgraoundPhoto: photoBG2,
        background: photoBG2,
        mainPhoto: image2,
        title: 'فیلم جنگل پرتقال',
        director: 'آرمان خوانساریان',
        genre: 'درام',
        score: '3.9/5',
        description: 'فیلم جنگل پرتقال نویسندگی و کارگردانی آرمان خوانساریان و محصول سال 1401 است. سارا بهرامی، میرسعید مولویان، رضا بهبودی، رضا عموزاد، فراز سرابی، داوود فتحعلی بیگی، فرشته مرعشی، ارشیا نیک‌بین، حمیدرضا عباسی، زینب شعبانی و حسام نورانی بازیگران این فیلم هستند.',
        summery: 'سهراب بهاریان نمایشنامه‌نویس ناموفق بعد از سال‌ها بیکاری معلم دبیرستان شده، او برای حفظ شغل تازه‌اش ناگزیر به ارائه اصل مدرک تحصیلی است. سهراب بعد از ۱۵ سال به شهر دانشجویی‌اش بازمی‌گردد اما این سفر آنطور که او فکر می‌کرده پیش نمی‌رود…',
        actors: [
          {
            name: 'بهرام افشاری',
            photo: photoA1,
          },
          {
            name: 'هادی کاظمی',
            photo: photoA2,
          },
          {
            name: 'الناز حبیبی',
            photo: photoA3,
          }
        ],
        cast: [
          'سارا بهرامی',
          'میرسعید مولویان',
          'رضا بهبودی',
          'رضا عموزاد',
          'فراز سرایی',
          'فرشته مرعشی',
          'ارشیا نیک بین'
        ],
        Comments: [
          {
            comment: 'به معنای واقعی کلمه عالی بود ، هم موضوعش خوب بود هم این که خنده و کمدی بود',
            name: 'ناشناس'
          },
          {
            comment: 'فک میکنم انقد رو پرده سینماها بمونه ک با نوه هامونم باید بریم بازم فیلم رو ببینیم',
            name: 'مهتاب نجفی'
          }
        ]
      },
      {
        id: 3,
        image: image3,
        caption: 'فسیل',
        duration: 85,
        photo: photoM1,
        background: image3,
        mainPhoto: image3,
        backgraoundPhoto: photoBG1,
        title: 'فیلم فسیل',
        director: 'کریم امینی',
        genre: 'کمدی',
        score: '4.5/5',
        description: 'فیلم فسیل به کارگردانی کریم امینی و تهیه‌کنندگی ابراهیم عامریان است. بهرام افشاری، هادی کاظمی، الناز حبیبی، الهه حصاری، ایمان صفا، بابک کریمی، سیدجواد هاشمی و ... در این فیلم کمدی ایفای نقش کرده‌اند.',
        summery: 'با فسيل به دهه پنجاه سفر كنيد...',
        actors: [
          {
            name: 'بهرام افشاری',
            photo: photoA1,
          },
          {
            name: 'هادی کاظمی',
            photo: photoA2,
          },
          {
            name: 'الناز حبیبی',
            photo: photoA3,
          }
        ],
        cast: [
          'بهرام افشاری',
          'هادی کاظمی',
          'الناز حبیبی',
          'الهه حصاری',
          'ایمان صفا',
          'بابک کریمی',
          'غلامرضا نیکخواه',
          'جواد هاشمی',
          'امید روحانی',
          'علیرضا استادی',
          'خشایار راد',
          'قاسم زارع',
        ],
        Comments: [
          {
            comment: 'به معنای واقعی کلمه عالی بود ، هم موضوعش خوب بود هم این که خنده و کمدی بود',
            name: 'ناشناس'
          },
          {
            comment: 'فک میکنم انقد رو پرده سینماها بمونه ک با نوه هامونم باید بریم بازم فیلم رو ببینیم',
            name: 'مهتاب نجفی'
          }
        ]
      },
      {
        id: 4,
        image: image4,
        caption: 'گیجگاه',
        duration: 105,
        photo: photoM3,
        background: photoBG3,
        mainPhoto: image4,
        backgraoundPhoto: photoBG3,
        title: 'فیلم گیجگاه',
        director: 'عادل تبریزی',
        genre: 'عاشقانه',
        score: '2.8/5',
        description: 'فیلم گیج‌گاه نخستین فیلم عادل تبریزی محصول سال 1399 است که در آن بازیگرانی همچون جمشید هاشم‌پور، حامد بهداد، باران کوثری، سروش صحت، فرهاد آییش ایفای نقش می‌کنند. این فیلم در سی‌و‌نهمین جنشواره‌ی فیلم فجر نیز حضور داشت و در دو بخش بهترین تدوین و بهترین کارگردان فیلم اولی، نامزد دریافت سیمرغ شد. ',
        summery: 'آشنایی زنی به نام مهتاب و مردی به نام حسن خشنود، شبیه قصه‌هاست، شبیه زندگی، شبیه سینما، شبیه روزگاری که خوش می‌‌گذشت...',
        actors: [
          {
            name: 'حامد بهداد',
            photo: photoA1,
          },
          {
            name: 'باران کوثری',
            photo: photoA2,
          },
          {
            name: 'سروش صحت',
            photo: photoA3,
          }
        ],
        cast: [
          'حامد بهداد',
          'باران کوثری',
          'سروش صحت',
          'بهرنگ علوی ',
          'امیرحسین رستمی',
          'نادر سلیمانی',
          'بیژن بنفشه خواه ',
          'سیاوش چراغی پور '
        ],
        Comments: [
          {
            comment: 'به معنای واقعی کلمه عالی بود ، هم موضوعش خوب بود هم این که خنده و کمدی بود',
            name: 'ناشناس'
          },
          {
            comment: 'فک میکنم انقد رو پرده سینماها بمونه ک با نوه هامونم باید بریم بازم فیلم رو ببینیم',
            name: 'مهتاب نجفی'
          }
        ]
      },
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
