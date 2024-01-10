<template>
  <v-img :src="getSrc(cinema.id)" dir="rtl" class="align-center mb-0 pa-0"
    gradient="to bottom, rgba(0,0,0,.7), rgba(2,8,0,1)" cover max-height="300px">
    <div dir="rtl" class="d-flex flex-row justify-center align-center mr-0 ml-0 opacity-background">

      <v-card variant="text" height="100%" width="100%"
        class="d-flex flex-row justify-content-start align-center text-white g-0 ms-0" cover>

        <v-img :src="getSrc(cinema.id)" style="max-height: 200px;max-width: 400px;border-radius: 10%;" rounded="5"
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
                <v-chip @click="dialog = true" class="ms-3" color="white" prepend-icon="mdi-star">
                  امتیاز شما
                </v-chip>
              </div>
              <div class="d-flex flex-row mt-5">
                <div v-for="feature in features" :key="feature.id" class="mr-5 ml-5">
                  <v-tooltip location="bottom">
                    <template v-slot:activator="{ on, props }">
                      <v-icon v-bind="props" v-on="on" color="grey-lighten-1">
                        {{ findFeatureicon(feature.featureName) }}
                      </v-icon>
                    </template>
                    <span>{{ findFeatureValue(feature.featureName) }}</span>
                  </v-tooltip>
                </div>

              </div>


            </div>
          </v-card-text>
        </div>

      </v-card>
    </div>

  </v-img>

  <v-dialog v-model="dialog" width="auto">
    <v-card>
      <v-card-title class="text-wrap mt-2" dir="rtl">امتیاز شما به {{ cinema.name }}</v-card-title>
      <v-card-text dir="rtl">
        <v-card dir="rtl" variant="outlined" class="mt-2">
          <v-card-text @click="submitRating(rate1)">
            <v-icon class="ms-5" color="red" icon="mdi-heart"></v-icon>
            <span>{{ rate1 }}/5:</span> خیلی ضعیف
          </v-card-text>
        </v-card>
        <v-card dir="rtl" variant="outlined" class="mt-2">
          <v-card-text @click="submitRating(rate2)">
            <v-icon class="ms-5" color="red" icon="mdi-heart"></v-icon>
            <span>{{ rate2 }}/5:</span> ضعیف
          </v-card-text>
        </v-card>
        <v-card dir="rtl" variant="outlined" class="mt-2">
          <v-card-text @click="submitRating(rate3)">
            <v-icon class="ms-5" color="red" icon="mdi-heart"></v-icon>
            <span>{{ rate3 }}/5:</span> متوسط
          </v-card-text>
        </v-card>
        <v-card dir="rtl" variant="outlined" class="mt-2">
          <v-card-text @click="submitRating(rate4)">
            <v-icon class="ms-5" color="red" icon="mdi-heart"></v-icon>
            <span>{{ rate4 }}/5:</span> خوب
          </v-card-text>
        </v-card>

        <v-card dir="rtl" variant="outlined" class="mt-2">
          <v-card-text @click="submitRating(rate5)">
            <v-icon class="ms-5" color="red" icon="mdi-heart"></v-icon>
            <span>{{ rate5 }}/5:</span> خیلی خوب
          </v-card-text>
        </v-card>
      </v-card-text>


    </v-card>
  </v-dialog>
  <!-- </v-col>
        </v-row> -->

  <div dir="rtl" style="background-color: rgb(235, 235, 235);">
    <div class="mt10 ml-8 mr-8 mb-10 ml-0 pa-1" rounded="5" style="background-color: white;">
      <h2 class="mt-10 mb-5 mr-3 text-black font-weight-bold">برنامه اکران {{ cinema && cinema.name }}</h2>
      <v-card>
        <v-tabs id="tabs" v-model="tab" color="deep-grey-accent-4 flex-xs-column" align-tabs="start" class="mt-5 mb-5">
          <v-tab :value="1" @click="handleTab(1)">{{ jalaliDay }} {{ jalaliMonth }}</v-tab>
          <v-tab :value="2" @click="handleTab(2)">{{ jalaliTomorrowDay }} {{ jalaliTomorrowMonth }}</v-tab>
          <v-tab :value="3" @click="handleTab(3)">{{ jalaliDayAfterTomorrowDay }} {{ jalaliDayAfterTomorrowMonth
          }}</v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item v-for="n in 3" :key="n" :value="n">

            <div class="mt-10 ml-0" v-for="(scene, index) in scenes" :key="index">

              <v-card dir="rtl" variant="text" class="mr-10 ml-10 pt-0">

                <v-row class="flex-lg-row flex-s-column justify-content-between">
                  <v-col col="9">
                    <v-row class="flex-lg-row flex-s-column justify-content-start">
                      <v-col>
                        <v-responsive :aspect-ratio="16 / 9">
                          <v-img rounded="4"
                            style="max-height: 300px;max-width: 200px; min-height: 100px; min-width: 100px;"
                            :src="getSrcMovie(scene.MovieId)"></v-img>
                        </v-responsive>
                      </v-col>
                      <v-col>
                        <div style="max-width: 100%;" class="d-flex flex-column mr-0 mt-5">
                          <v-card-title class="text-h6 font-weight-bold" dir="rtl">{{ scene.MovieName }}</v-card-title>
                          <v-card-text dir="rtl">
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
                    <v-btn @click="handleClick(index)" class="mr-10">سانس ها</v-btn>
                  </v-col>
                </v-row>



              </v-card>

              <v-row class="d-flex flex-row flex-wrap mt-5 mb-10">
                <div v-if="conditions[index]">
                  <v-card v-for="saloon in scene.SceneSaloon" class="ml-10 mt-5 mr-10 elevation-8 pl-5 pr-5"
                    variant="text" style="min-width: 100px ;">

                    <div class="d-flex flex-column">
                      <div class="ml-3 mr-3">
                        <v-card-title>{{ saloon.SaloonName }}</v-card-title>
                        <v-card-item>

                          <p class="mt-3 mb-3 mr-0">
                            <v-icon style="min-width: none;" icon="mdi-clock"></v-icon>
                            سانس {{ saloon.StartTime }}
                          </p>
                          <v-card-subtitle>
                            60000 تومان
                          </v-card-subtitle>
                        </v-card-item>
                      </div>
                      <v-btn @click="gotoSeat(saloon.SceneId)" class="mt-2 mr-5 mb-3" prepend-icon="mdi-ticket"
                        variant="flat" color="red">
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

    <h2 dir="rtl" class="mt-20 mb-3 mr-10 text-grey font-weight-bold">درباره {{ cinema && cinema.name }}</h2>
    <p dir="rtl" class="mr-10 ml-10 mt-7">{{ cinema && cinema.description }}</p>
    <v-btn class="mr-10 mt-5 mb-16" prepend-icon="mdi-phone"><template>
        <v-icon style="color: rgb(26, 133, 26);"></v-icon>
      </template>{{ cinema && cinema.contact }}</v-btn>
    <div style="height: 200px;">

    </div>

    <!-- <div dir="rtl" class="ml-8 mr-8 mb-10 pb-5" style="background-color: white; margin-bottom: 300px;border-radius: 10px;">

      <h2  dir="rtl" class="mt-10 mb-3 mr-3 pt-5 text-grey font-weight-bold">دیدگاه کاربران درباره {{ cinema && cinema.name
      }}</h2>
      <hr class="ms-3 me-3 mt-5 mb-3" style="color: rgb(144, 144, 142);">
      <v-container dir="rtl" class="text-right text-black mb-10 ml-10 mr-0">

        <v-textarea bg-color="rgb(221, 221, 221)" color="black" dir="rtl" class="text-right"
          placeholder="دیدگاه شما..."></v-textarea>
          <v-btn min-width="150px" text="ثبت دیدگاه" color="red" class="mt-5 ml-10 pr-0 pl-0" prepend-icon="mdi-plus" style="width: 20%;" dir="rtl"></v-btn>
      </v-container> -->
    <!-- <div class="mt-5 mb-5" v-for="comment in comments " :key="comment.id">
      <v-card>
        <v-card-subtitle>
          {{ comment.name }}
        </v-card-subtitle>
        <v-card-text>
          {{ comment.comment }}
        </v-card-text>
      </v-card>
    </div> -->
  </div>
</template>

<style>
label {
  direction: rtl;
}

/* #my-textarea .v-input__control ,#my-textarea  .v-input__details{
  width: 800px;
 } */

#my-textarea {
  border-color: solid black;
  height: 400px;
  background-color: rgb(194, 191, 191);
}
</style>

<script lang="js">
import { mdiWifi } from '@mdi/js';
import moment from 'jalali-moment';
import { ref, onMounted, computed } from 'vue';
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

    const rate1 = 1
    const rate2 = 2
    const rate3 = 3
    const rate4 = 4
    const rate5 = 5
    const dialog = ref(false)

    const submitRating = (rate) => {
      dialog.value = false
      console.log(rate)
      fetch('http://185.128.40.150:8080/api/cinema/rating/add/' + route.params.id, {
        method: 'POST',
        body: JSON.stringify({ score: rate }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error submitting score');
          }
          return response.text();
        })
        .then(text => {
          console.log('Response:', text);
        })
        .catch(error => {
          console.error('Error submitting rate:', error);
        });
    };

    const gotoSeat = (index) => {
      console.log(index)
      router.push({ name: 'SeatSelect', params: { id: index } })
    };
    const jalaliDay = ref('');
    const jalaliMonth = ref('');

    const jalaliTomorrowDay = ref('');
    const jalaliTomorrowMonth = ref('');

    const jalaliDayAfterTomorrowDay = ref('');
    const jalaliDayAfterTomorrowMonth = ref('');

    const route = useRoute();
    const cinema = ref({});

    console.log(route.params.id)
    const features = ref([])

    fetch('http://185.128.40.150:8080/api/cinemas/' + route.params.id)
      .then(response => response.json())
      .then(data => {
        cinema.value = data.cinema
        features.value = data.features
      })

    console.log(cinema)
    console.log(features)
    const router = useRouter();

    const comments = ref([])
    fetch('http://185.128.40.150:8080/api/cinema/comments/' + route.params.id)
      .then(response => response.json())
      .then(data => { comments.value = data.comments })

    console.log('The comments are : ' + comments.value)

    const calculateMinute = (time) => {
      const number = time % 60
      const remainder = number % 5

      return remainder === 0 ? number : number + (5 - remainder);
    }

    const calculateHour = (time) => {
      return Math.floor(time / 60)
    }



    const scenes = ref([]);
    const firstApi = `http://185.128.40.150:8080/api/movie/cinemas/${route.params.id}?time=2024-01-02`;

    fetch(firstApi)
      .then(response => response.json())
      .then(data => { scenes.value = data.scene })

    const handleTab = (tabValue) => {
      fetchSearchResults(tabValue)
    }

    const fetchSearchResults = async (tabValue) => {
      try {
        let apiUrl = '';

        const today = new Date();
        const currentDate = today.toISOString().split('T')[0];

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const tomorrowDate = tomorrow.toISOString().split('T')[0];

        const dayAfterTomorrow = new Date(today);
        dayAfterTomorrow.setDate(today.getDate() + 2);
        const dayAfterTomorrowDate = dayAfterTomorrow.toISOString().split('T')[0];

        switch (tabValue) {
          case 1:
            apiUrl = `http://185.128.40.150:8080/api/cinema/movies/${route.params.id}?time=${currentDate}`;
            break;
          case 2:
            apiUrl = `http://185.128.40.150:8080/api/cinema/movies/${route.params.id}?time=${tomorrowDate}`;
            break;
          case 3:
            apiUrl = `http://185.128.40.150:8080/api/cinema/movies/${route.params.id}?time=${dayAfterTomorrowDate}`;
            break;
          default:
            apiUrl = '';
            break;
        }
        if (apiUrl) {
          const response = await fetch(apiUrl);
          const data = await response.json();
          // Process the API response data here
          console.log(data);
          if (data.status == 0 || data.status == "0") {

          }
          scenes.value = data.scene

        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    const openItems = ref([]);
    const conditions = ref([])

    for (let i = 0; i < scenes.value.length; i++) {
      conditions.value[i] = false;
    }

    function handleClick(itemId) {
      console.log(itemId);
      console.log(scenes.value[itemId].SceneSaloon);
      conditions.value[itemId] = !conditions.value[itemId];
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

    const getSrc = (id) => {
      const src = `/src/assets/cinema1/${id}.jpeg`
      return src;
    }

    const getSrcMovie = (id) => {
      const src = `/src/assets/images/${id}.jpeg`
      return src;
    }

    const findFeatureicon = (value) => {
      console.log(value)
      if (value === 'ghaza') {
        return 'mdi-food'
      } else {
        return `mdi-${value}`

      }
    }

    const findFeatureValue = (value) => {
      console.log(value)
      if (value === 'food' || value === 'ghaza') {
        return 'فود کورت'
      }
      else if (value === 'coffee') {
        return 'کافی شاپ'
      }
      else if (value === 'parking') {
        return 'پارکینگ'
      }
    }
    return {
      cinema, comments, scenes, handleClick, currentHour, currentMinute, updateHour, calculateMinute, calculateHour, jalaliDay, formatDigit,
      jalaliMonth, jalaliDayAfterTomorrowDay, jalaliDayAfterTomorrowMonth, jalaliTomorrowDay, jalaliTomorrowMonth, cinemaScenes, cinemaSaloons, dialog,
      isItemOpen, gotoSeat, getSrc, conditions, getSrcMovie, features, findFeatureicon, findFeatureValue, handleTab, submitRating, rate1, rate2, rate3, rate4, rate5
    }
  }
}
</script>
