<template>
  <v-img :src="film.background" dir="rtl" class="align-center mb-0 pa-0"
    gradient="to bottom, rgba(0,0,0,.7), rgba(2,8,0,1)" cover max-height="300px">
    <div dir="rtl" class="d-flex flex-row justify-center align-center mr-0 ml-0 opacity-background">
      <v-card variant="text" height="100%" width="100%"
        class="d-flex flex-row justify-content-start align-center text-white g-0 ms-0" cover>
        <v-img :src="film.mainPhoto" style="max-height: 200px;max-width: 400px;border-radius: 10%;" rounded="5"
          class="mt-5 mb-5"></v-img>
        <div class="mr-0">
          <v-card-title class="text-h6 font-weight-bold mb-5" dir="rtl">
            <span>{{ film.title }}</span> | <span class="text-subtitle-1">{{ film.director }}</span>
          </v-card-title>
          <v-card-text dir="rtl">
            <div class="mt-3 mb-3">
              {{ film.genre }}
            </div>
            <div class="d-flex flex-column mt-3 ">
              <div color="red" class="d-flex flex-row border-white mt-3 me-6 text-h6">
                <v-icon class="ms-5" color="red" icon="mdi-heart"></v-icon>
                <div class="text-red ms-1 font-weight-bold text-h6">
                  {{ film.score }}
                </div>
                <v-chip @click="console.log('clicked')" class="ms-3" color="white" prepend-icon="mdi-star">
                  امتیاز شما
                </v-chip>
              </div>
              <div class="d-flex flex-row mt-5">
                <div v-for="(actor, i) in film.actors" :key="i" class="mr-5 ml-5">
                  <div class="d-flex align-items-center">
                    <v-img :src="actor.photo" width="50px" height="50px" class="mr-2 rounded-lg"
                      style="object-fit: cover;"></v-img>
                    <span class="ma-4">{{ actor.name }}</span>
                  </div>
                </div>
              </div>
            </div>
          </v-card-text>
        </div>
      </v-card>
    </div>
  </v-img>
  <div dir="rtl" style="background-color: rgb(235, 235, 235);" class="pa-6">
    <div dir="rtl" class="ma-4">
      <h3>
        درباره {{ film.title }}
      </h3>
      <p class="ma-4">
        {{ film.description }}
      </p>
      <p class="ma-4">
        خلاصه داستان: {{ film.summery }}
      </p>
      <h4>
        بازیگران {{ film.title }}
      </h4>
      <v-row>
        <v-col cols="12" sm="6" md="2" v-for="(actor, index) in film.cast" :key="index">
          <v-list dense class="no-fill">
            <v-list-item class="no-fill">
              <v-list-item-content>
                <v-list-item-title>{{ actor }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </div>
    <div class="mt-16 ml-8 mr-8 mb-10 ml-0 pa-4 rounded" style="background-color: white;">
      <h2 class="ma-4 text-black font-weight-bold">برنامه اکران {{ film.name }}</h2>
      <v-card>
        <v-tabs id="tabs" v-model="tab" color="deep-grey-accent-4 flex-xs-column" align-tabs="start"
          class="mr-10 mt-5 mb-5" show-arrows>
          <v-tab :value="1">{{ jalaliDay }} {{ jalaliMonth }}</v-tab>
          <v-tab :value="2">{{ jalaliTomorrowDay }} {{ jalaliTomorrowMonth }}</v-tab>
          <v-tab :value="3">{{ jalaliDayAfterTomorrowDay }} {{ jalaliDayAfterTomorrowMonth }}</v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item v-for="n in 3" :key="n" :value="n">
            <div class="mt-10 ml-0" v-for="(cinema, i) in cinemas" :key="i">
              <v-card dir="rtl" variant="text" class="mr-10 ml-10 pt-0">
                <v-row class="flex-lg-row flex-s-column justify-content-between">
                  <v-col col="9">
                    <v-row class="flex-lg-row flex-s-column justify-content-start">
                      <v-col>
                        <v-responsive :aspect-ratio="16 / 9">
                          <v-img class="rounded-4"
                            style="max-height: 300px;max-width: 200px; min-height: 100px; min-width: 100px;"
                            :src="cinema.image"></v-img>
                        </v-responsive>
                      </v-col>
                      <v-col>
                        <div style="max-width: 100%;" class="d-flex flex-column mr-0 mt-5">
                          <v-card-title class="text-h6 font-weight-bold" dir="rtl">{{ cinema.name }}</v-card-title>
                          <v-card-text dir="rtl">
                            <div class="mt-3 mb-3">
                              {{ cinema.location }}
                            </div>
                            <div class="d-flex flex-row mt-3 ">
                              <div color="red" class="d-flex flex-row border-white mt-3 me-3">
                                <v-icon class="ms-5" color="red" icon="mdi-heart"></v-icon>
                                <div class="text-red ms-1">
                                  {{ cinema.score }}
                                </div>
                              </div>
                            </div>
                          </v-card-text>
                        </div>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col>
                    <v-btn @click="handleClick(i)" class="mr-10">سانس ها</v-btn>
                  </v-col>
                </v-row>
              </v-card>
              <v-row class="d-flex flex-row flex-wrap mt-5 mb-10">
                <div v-for="(scene, j) in scenes" :key="j">
                  <v-card
                    v-if="isItemOpen(i) && currentHour + calculateHour(film.duration * j + currentMinute + 30) <= 23"
                    class="ml-10 mt-5 mr-10 elevation-8 pl-5 pr-5" variant="text" style="min-width: 100px ;">
                    <div class="d-flex flex-column">
                      <div class="ml-3 mr-3">
                        <v-card-item>
                          <p class="mt-3 mb-3 mr-0">
                            <v-icon style="min-width: none;" icon="mdi-clock"></v-icon>
                            سانس {{ calculateMinute(film.duration * j + currentMinute + 25) }} : {{ currentHour +
                              calculateHour(film.duration * j + currentMinute + 25) }}
                          </p>
                          <v-card-subtitle>
                            60000 تومان
                          </v-card-subtitle>
                        </v-card-item>
                      </div>
                      <v-btn class="mt-2 mr-5 mb-3" prepend-icon="mdi-ticket" variant="flat" color="red">
                        خرید بلیت
                      </v-btn>
                    </div>
                  </v-card>
                </div>
              </v-row>
            </div>
          </v-window-item>
        </v-window>
      </v-card>
    </div>
    <div dir="rtl" class="ml-8 mr-8 mb-10 pa-4 pt-1" style="background-color: white; margin-bottom: 300px;border-radius: 10px;">
      <h2 dir="rtl" class="mt-10 mb-3 mr-3 pt-5 text-grey font-weight-bold">دیدگاه کاربران درباره {{ film.title }}</h2>
      <div class="mt-8 mb-5" v-for="(Comment, i) in film.Comments" :key="i">
        <v-card>
          <v-card-subtitle>
            {{ Comment.name }}
          </v-card-subtitle>

          <v-card-text>
            {{ Comment.comment }}
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>

<style>
@media(max-width:425) {
  #tabs {
    display: flex;
    flex-direction: column;
  }
}
.no-fill {
  background-color: transparent !important;
}
</style>

<script lang="js">
import backPhoto from '@/assets/Film1/back.jpeg';
import filmPhoto from '@/assets/images/fosil.jpeg';
import photoA1 from '@/assets/Film1/ac1.jpg';
import photoA2 from '@/assets/Film1/ac2.jpg';
import photoA3 from '@/assets/Film1/ac3.jpg';
import photoC1 from '@/assets/cinema1/1.jpg';
import photoC2 from '@/assets/cinema1/2.jpg';
import photoC3 from '@/assets/cinema1/3.jpg';
import { mdiWifi } from '@mdi/js';
import moment from 'jalali-moment';
import { ref, onMounted } from 'vue';

export default {
  data: () => ({
    tab: null,
    path: mdiWifi,
  }),

  setup() {

    const jalaliDay = ref('');
    const jalaliMonth = ref('');

    const jalaliTomorrowDay = ref('');
    const jalaliTomorrowMonth = ref('');

    const jalaliDayAfterTomorrowDay = ref('');
    const jalaliDayAfterTomorrowMonth = ref('');

    const calculateMinute = (time) => {
      const number = time % 60
      const remainder = number % 5
      return remainder === 0 ? number : number + (5 - remainder);
    }

    const calculateHour = (time) => {
      return Math.floor(time / 60)
    }
    const cinemas = [
      {
        id: 1,
        name: ' پردیس سینمایی کوروش',
        location: 'اتوبان همت غرب، ستاری شمال',
        score: '3.6',
        image: photoC1,
        condition: false,
      },
      {
        id: 2,
        name: 'پردیس سینمایی ایران مال',
        location: 'اتوبان همت غرب، اتوبان خرازی',
        score: '4.0',
        image: photoC2,
        condition: false,
      },
      {
        id: 3,
        name: 'پردیس سینمایی آزادی',
        location: 'خیابان بهشتی',
        score: '3.3',
        image: photoC3,
        condition: false,
      }
    ]
    const film = {
      id: 1,
      duration: '85',
      background: backPhoto,
      mainPhoto: filmPhoto,
      title: 'فیلم فسیل',
      director: 'کریم امینی',
      genre: 'کمدی',
      score: '4.5/5',
      description: "فیلم فسیل به کارگردانی کریم امینی و تهیه‌کنندگی ابراهیم عامریان است. بهرام افشاری، هادی کاظمی، الناز حبیبی، الهه حصاری، ایمان صفا، بابک کریمی، سیدجواد هاشمی و ... در این فیلم کمدی ایفای نقش کرده‌اند.",
      summery: "با فسيل به دهه پنجاه سفر كنيد...",
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
          comment:'فک میکنم انقد رو پرده سینماها بمونه ک با نوه هامونم باید بریم بازم فیلم رو ببینیم',
          name: 'مهتاب نجفی'
        }
      ]
    }
    const scenes = [
      {
        id: 1,
        movie_id: 1,
      },
      {
        id: 4,
        movie_id: 2,
      },
      {
        id: 2,
        movie_id: 2,
      },
      {
        id: 3,
        movie_id: 3,
      }

    ]
    // const activeFilmIndex = ref(null)
    // const condition = ref(true);
    const openItems = ref([]);
    // const handleClick = (index) => {
    //   console.log('The condition for ' + index + ' before is: ' + films[index].condition);
    //   films[index].condition = !films[index].condition;
    //   console.log('The condition for ' + index + ' after is: ' + films[index].condition);
    // };

    function handleClick(itemId) {
      cinemas[itemId].condition = !cinemas[itemId].condition;
      if (!isItemOpen(itemId) && cinemas[itemId].condition) {
        openItems.value.push(itemId);
      } else if (!cinemas[itemId].condition) {
        openItems.value.pop(itemId)
      }
    }

    function isItemOpen(itemId) {
      if (openItems.value.includes(itemId)) {
        return true;
      }
      else {
        return false
      }
    }
    const currentHour = ref('');
    const currentMinute = ref('')

    const updateHour = () => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getHours();

      currentHour.value = hour;
      currentMinute.value = minute
    };

    const formatDigit = (value) => {
      return value < 10 ? '0' + value : value;
    };

    onMounted(() => {
      setInterval(updateHour, 1000);
      updateHour();
    });

    onMounted(() => {
      const currentDate = moment().locale('fa').format('D MMMM');
      const [day, month] = currentDate.split(' ');

      const tomorrowDate = moment().add(1, 'days').locale('fa');
      const dayAfterTomorrowDate = moment().add(2, 'days').locale('fa');

      jalaliTomorrowDay.value = tomorrowDate.format('D');
      jalaliTomorrowMonth.value = tomorrowDate.format('MMMM');

      jalaliDayAfterTomorrowDay.value = dayAfterTomorrowDate.format('D');
      jalaliDayAfterTomorrowMonth.value = dayAfterTomorrowDate.format('MMMM');


      jalaliDay.value = day;
      jalaliMonth.value = month;
      console.log(jalaliDay, jalaliMonth)
    });

    const cinemaScenes = ref([])
    const cinemaSaloons = ref([])

    const handleScne = (movie_id, scene, cinema_id) => {
      // if (movie_id === scene.movie_id) {
      //   saloons.forEach((saloon) => {
      //     if (saloon.id === scene.saloon_id) {
      //       if (saloon.cinema_id === cinema_id) {
      //         cinemaScenes.value.push(scene)
      //         cinemaSaloons.value.push(saloon)
      //         Object.values(cinemaScenes).forEach((scene) => {
      //           console.log('The scene is : ' + scene.value)
      //         })
      //         Object.values(cinemaSaloons).forEach((saloon) => {
      //           console.log('The saloon is : ' + saloon.value)
      //         })
      //       }
      //     }
      //   })
      // }
    }
    return {
      cinemas, film, scenes, handleClick, currentHour, currentMinute, updateHour, calculateMinute, calculateHour, jalaliDay, formatDigit,
      jalaliMonth, jalaliDayAfterTomorrowDay, jalaliDayAfterTomorrowMonth, jalaliTomorrowDay, jalaliTomorrowMonth, handleScne, cinemaScenes, cinemaSaloons,
      isItemOpen,
    }
  }
}
</script>
