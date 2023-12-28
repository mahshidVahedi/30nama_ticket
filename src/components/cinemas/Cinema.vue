<template>
  <v-img :src="cinema && cinema.image" dir="rtl" class="align-center mb-0 pa-0"
    gradient="to bottom, rgba(0,0,0,.7), rgba(2,8,0,1)" cover max-height="300px">
    <div dir="rtl" class="d-flex flex-row justify-center align-center mr-0 ml-0 opacity-background">

      <v-card variant="text" height="100%" width="100%"
        class="d-flex flex-row justify-content-start align-center text-white g-0 ms-0" cover>

        <v-img :src="cinema && cinema.image" style="max-height: 200px;max-width: 400px;border-radius: 10%;" rounded="5"
          class="mt-5 mb-5 d-none d-sm-flex"></v-img>
        <div class="mr-0">
          <v-card-title class="text-h6 font-weight-bold mb-5" dir="rtl">{{ cinema && cinema.name }}</v-card-title>
          <v-card-text dir="rtl">
            <div class="mt-3 mb-3">
              {{ cinema && cinema.location }}
            </div>
            <div class="d-flex flex-column mt-3 ">

              <div color="red" class="d-flex flex-row border-white mt-3 me-3">
                <v-icon class="ms-5" color="red" icon="mdi-heart"></v-icon>
                <div class="text-red ms-1 font-weight-bold">
                  {{ cinema && cinema.score }}
                </div>

                <v-chip @click="console.log('clicked')" class="ms-3" color="white" prepend-icon="mdi-star">
                  امتیاز شما
                </v-chip>
              </div>
              <div class="d-flex flex-row mt-5">

                <div v-for="(feature, i) in cinema && cinema.features" :key="i" class="mr-5 ml-5">

                  <v-tooltip location="bottom">
                    <template v-slot:activator="{ on, props }">

                      <v-icon v-bind="props" v-on="on" color="grey-lighten-1">
                        {{ feature.icon }}
                      </v-icon>
                    </template>
                    <span>{{ feature.value }}</span>
                  </v-tooltip>

                </div>

              </div>


            </div>
          </v-card-text>
        </div>

      </v-card>
    </div>

  </v-img>
  <!-- </v-col>
        </v-row> -->

  <div dir="rtl" style="background-color: rgb(235, 235, 235);">
    <div class="mt10 ml-8 mr-8 mb-10 ml-0" rounded="5" style="background-color: white;">
      <h2 class="mt-10 mb-5 mr-3 text-black font-weight-bold">برنامه اکران {{ cinema && cinema.name }}</h2>
      <v-card>
        <v-tabs id="tabs" v-model="tab" color="deep-grey-accent-4 flex-xs-column" align-tabs="start" class="mt-5 mb-5">
          <v-tab :value="1">{{ jalaliDay }} {{ jalaliMonth }}</v-tab>
          <v-tab :value="2">{{ jalaliTomorrowDay }} {{ jalaliTomorrowMonth }}</v-tab>
          <v-tab :value="3">{{ jalaliDayAfterTomorrowDay }} {{ jalaliDayAfterTomorrowMonth }}</v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item v-for="n in 3" :key="n" :value="n">

            <div class="mt-10 ml-0" v-for="(film, i) in films" :key="i">

              <v-card dir="rtl" variant="text" class="mr-10 ml-10 pt-0">

                <v-row class="flex-lg-row flex-s-column justify-content-between">
                  <v-col col="9">
                    <v-row class="flex-lg-row flex-s-column justify-content-start">
                      <v-col>
                        <v-responsive :aspect-ratio="16 / 9">
                          <v-img rounded="4"
                            style="max-height: 300px;max-width: 200px; min-height: 100px; min-width: 100px;"
                            :src="film.photo"></v-img>
                        </v-responsive>
                      </v-col>
                      <v-col>
                        <div style="max-width: 100%;" class="d-flex flex-column mr-0 mt-5">
                          <v-card-title class="text-h6 font-weight-bold" dir="rtl">{{ film.title }}</v-card-title>
                          <v-card-text dir="rtl">
                            <div class="mt-3 mb-3">
                              کارگردان : {{ film.director }}
                            </div>
                            <v-chip>{{ film.genre }}</v-chip>
                            <div class="d-flex flex-row mt-3 ">
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
                          <p class="mt-3 mb-3 ml-2">
                            <v-icon icon="mdi-clock"></v-icon>
                            سانس {{ calculateMinute(film.duration * j + currentMinute + 25) }} : {{ currentHour +
                              calculateHour(film.duration * j + currentMinute + 50) }}
                          </p>
                          <v-card-subtitle>
                            60000 تومان
                          </v-card-subtitle>
                        </v-card-item>
                      </div>

                      <v-btn @click="showDialog = true" class="mt-2 mr-5 mb-3" prepend-icon="mdi-ticket" variant="flat" color="red">
                        خرید بلیت
                      </v-btn>
                      <v-dialog v-model="showDialog" max-width="500px">
                        <v-card>
                          <v-card-title dir="rtl">انتخاب صندلی</v-card-title>
                          <div dir="rtl" class="mr-8">
                            <p>
                              <v-icon>mdi-movie</v-icon>
                              {{ film && film.title }}
                            </p>
                            <p>
                              <v-icon>mdi-map-marker</v-icon>
                              {{ cinema.name }}
                            </p>
                            <p class="mt-3 mb-3 mr-0">
                              <v-icon style="min-width: none;" icon="mdi-clock"></v-icon>
                              {{ jalaliDay }} {{ jalaliMonth }} - سانس {{ calculateMinute(film.duration * j +
                                currentMinute + 25) }} : {{ currentHour +
                                calculateHour(film.duration * j + currentMinute + 25) }}
                            </p>
                          </div>
                          <v-card-text>
                            <v-container>
                              <div class="scene mb-8">
                                صحنه نمایش
                              </div>
                              <v-row v-for="row in 8" :key="row">
                                <v-col v-for="seat in 9" :key="seat">
                                  <v-icon icon="mdi-seat" @click="toggleSeat(row, seat)"
                                    :class="{ 'mdi-seat': isSelectedSeat(row, seat), 'mdi-seat-occupied': !isSelectedSeat(row, seat) }"></v-icon>
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-card-text>
                          <v-card-actions>
                            <v-btn @click="closeDialog">بستن</v-btn>
                            <v-btn @click="saveAndCloseDialog" :disabled="!canSave">خرید</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </div>
                  </v-card>

                </div>

              </v-row>


            </div>
          </v-window-item>
        </v-window>


      </v-card>


    </div>

    <h2 dir="rtl" class="mt-20 mb-3 mr-10 text-grey font-weight-bold">درباره {{ cinema && cinema.name }}</h2>
    <p dir="rtl" class="mr-10 ml-10 mt-7">{{ cinema && cinema.description }}</p>
    <v-btn class="mr-10 mt-5 mb-10" prepend-icon="mdi-phone"><template>
        <v-icon style="color: rgb(26, 133, 26);"></v-icon>
      </template>{{ cinema && cinema.contact }}</v-btn>

    <div dir="rtl" class="ml-8 mr-8 mb-10 pb-5" style="background-color: white; margin-bottom: 300px;border-radius: 10px;">
      
      <h2  dir="rtl" class="mt-10 mb-3 mr-3 pt-5 text-grey font-weight-bold">دیدگاه کاربران درباره {{ cinema && cinema.name
      }}</h2>
  <hr class="ms-3 me-3 mt-5 mb-3" style="color: rgb(144, 144, 142);">
  <div style="width: 50%;" class="mt-5 mb-10 mr-5 d-flex flex-column ">

<textarea
  dir="rtl"
  class="text-right"
  counter
  placeholder="دیدگاه شما"
  :rules="rules"
  :model-value="value"
  id="my-textarea"
  
></textarea>
<v-btn color="red" class="mt-5 mb-10 float-left" prepend-icon="mdi-plus" style="width: 20%;">ثبت دیدگاه</v-btn>

  </div>

  
      <div class="mt-5 mb-5 mr-4" v-for="(Comment, i) in cinema && cinema.Comments" :key="i">
        <v-card elevation="2" dir="rtl" class="mt-10">
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
 label{
  direction: rtl;
 }
 
 /* #my-textarea .v-input__control ,#my-textarea  .v-input__details{
  width: 800px;
 } */

 #my-textarea{
  border-color: solid black;
  height: 400px;
  background-color: rgb(194, 191, 191);
 }
</style>

<script lang="js">
import photoM1 from '@/assets/fosilM.jfif'
import photoM2 from '@/assets/jangal.jfif'
import photoM3 from '@/assets/gijgah.jfif';
import { mdiWifi } from '@mdi/js';
import moment from 'jalali-moment';
import { ref, onMounted, computed} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import router from '@/router';


export default {

  data: () => ({
    tab: null,
    path: mdiWifi,
    rules: [v => v.length <= 500 || 'حداکثر 500 کاراکتر'],
    value: '',
  }),

  setup() {

    const showDialog = ref(false);
    const selectedSeats = ref([]);

    const toggleSeat = (row, seat) => {
      const seatId = `${row}-${seat}`;
      if (isSelectedSeat(row, seat)) {
        selectedSeats.value = selectedSeats.value.filter(s => s !== seatId);
      } else {
        selectedSeats.value.push(seatId);
      }
    };

    const isSelectedSeat = (row, seat) => {
      const seatId = `${row}-${seat}`;
      return selectedSeats.value.includes(seatId);
    };

    const closeDialog = () => {
      showDialog.value = false;
    };

    const saveAndCloseDialog = () => {
      showDialog.value = false;
      router.push({ name: 'Payment' })
    };

    const canSave = computed(() => {
      return selectedSeats.value.length > 0;
    });

    const jalaliDay = ref('');
    const jalaliMonth = ref('');

    const jalaliTomorrowDay = ref('');
    const jalaliTomorrowMonth = ref('');

    const jalaliDayAfterTomorrowDay = ref('');
    const jalaliDayAfterTomorrowMonth = ref('');

    const route = useRoute();
    const cinema = ref(null);

    onMounted(() => {
      cinema.value = JSON.parse(route.params.cinema);
      console.log(cinema.value);
    });

    const calculateMinute = (time) => {
      const number = time % 60
      const remainder = number % 5

      return remainder === 0 ? number : number + (5 - remainder);
    }

    const calculateHour = (time) => {
      return Math.floor(time / 60)
    }
    const films = [
      {
        id: 1,
        title: 'فسیل',
        director: 'کریم امینی',
        photo: photoM1,
        score: '4.5/5',
        duration: '85',
        genre: 'کمدی',
        description: "فیلم فسیل به کارگردانی کریم امینی و تهیه‌کنندگی ابراهیم عامریان است. بهرام افشاری، هادی کاظمی، الناز حبیبی، الهه حصاری، ایمان صفا، بابک کریمی، سیدجواد هاشمی و ... در این فیلم کمدی ایفای نقش کرده‌اند.",
        casts: [
          ' بهرام افشاری',
          'هادی کاظمی',

        ],
        condition: false,
      },
      {
        id: 2,
        title: 'جنگل پرتقال',
        director: ' آرمان خوانساریان',
        photo: photoM2,
        score: '4/5',
        duration: '90',
        genre: 'درام',
        description: "فیلم جنگل پرتقال نویسندگی و کارگردانی آرمان خوانساریان و محصول سال 1401 است. سارا بهرامی، میرسعید مولویان، رضا بهبودی، رضا عموزاد، فراز سرابی، داوود فتحعلی بیگی، فرشته مرعشی، ارشیا نیک‌بین، حمیدرضا عباسی، زینب شعبانی و حسام نورانی بازیگران این فیلم هستند.",
        casts: [
          'سارا بهرامی ',
          'میرسعید مولویان',

        ],
        condition: false,
      },
      {
        id: 3,
        title: 'گیجگاه',
        director: ' عادل تبریزی',
        photo: photoM3,
        score: '2.9/5',
        duration: '105',
        genre: 'عاشقانه',
        description: "فیلم گیج‌گاه نخستین فیلم عادل تبریزی محصول سال 1399 است که در آن بازیگرانی همچون جمشید هاشم‌پور، حامد بهداد، باران کوثری، سروش صحت، فرهاد آییش ایفای نقش می‌کنند. این فیلم در سی‌و‌نهمین جنشواره‌ی فیلم فجر نیز حضور داشت و در دو بخش بهترین تدوین و بهترین کارگردان فیلم اولی، نامزد دریافت سیمرغ شد. ",
        casts: [
          'حامد بهداد ',
          'باران کوثری',

        ],
        condition: false,
      }
    ]


    const saloons = [
      {
        id: 1,
        name: 'خورشیدنو',
        cinema_id: 1,

      },
      {
        id: 2,
        name: 'گراند سینما',
        cinema_id: 1,

      },
      {
        id: 2,
        name: 'سالن 1',
        cinema_id: 2,

      }
    ]

    const scenes = [
      {
        id: 1,
        saloon_id: 1,
        movie_id: 1,

      },
      {
        id: 4,
        saloon_id: 2,
        movie_id: 2,
      },
      {
        id: 2,
        saloon_id: 2,
        movie_id: 2,

      },
      {
        id: 3,
        saloon_id: 1,
        movie_id: 3,

      }

    ]

    const openItems = ref([]);

    function handleClick(itemId) {
      films[itemId].condition = !films[itemId].condition;
      if (!isItemOpen(itemId) && films[itemId].condition) {
        openItems.value.push(itemId);
      } else if (!films[itemId].condition) {
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
      const minute = now.getMinutes()

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
      cinema, films, saloons, scenes, handleClick, currentHour, currentMinute, updateHour, calculateMinute, calculateHour, jalaliDay, formatDigit,
      jalaliMonth, jalaliDayAfterTomorrowDay, jalaliDayAfterTomorrowMonth, jalaliTomorrowDay, jalaliTomorrowMonth, handleScne, cinemaScenes, cinemaSaloons,
      isItemOpen, showDialog, selectedSeats, toggleSeat, closeDialog, saveAndCloseDialog, canSave, isSelectedSeat,
    }
  }
}


</script>
