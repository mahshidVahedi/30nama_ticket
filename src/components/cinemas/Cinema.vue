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
                          <v-img style="max-height: 200px;max-width: 300px; min-height: 150; min-width:210px ;"
                            rounded="lg" :src="getSrcMovie(scene.MovieId)"></v-img>
                        </v-responsive>
                      </v-col>
                      <v-col>
                        <div style="max-width: 100%;" class="d-flex flex-column mr-0 mt-5">
                          <v-card-title class="text-h6 font-weight-bold" dir="rtl">{{ scene.MovieName }}</v-card-title>
                          <v-card-text dir="rtl">
                            <v-chip>{{ scene.MovieGenre }}</v-chip>
                            <div class="d-flex flex-row mt-3 ">
                              <div class="d-flex flex-row mt-3 me-3 rounded-pill border-white">
                                <v-icon class="me-1 " icon="mdi-clock"></v-icon>
                                {{ scene.MovieDuration }}
                              </div>
                              <div color="red" class="d-flex flex-row border-white mt-3 me-3">
                                <v-icon class="ms-5" color="red" icon="mdi-heart"></v-icon>
                                <div class="text-red ms-1">
                                  {{ scene.MovieScore
                                  }}
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

              <v-row class="mt-5 mb-10">>
                <v-card v-if="conditions[index]" v-for="saloon in scene.SceneSaloon" cols="12" sm="6" md="4" lg="3"
                  class="ml-10 mt-5 mr-10 elevation-8 pl-5 pr-5" variant="text"
                  style=" max-width: 280px;min-width: 100px ;">

                  <div class="d-flex flex-column">
                    <div class="ml-3 mr-3">
                      <v-card-title class="text-wrap">{{ saloon.SaloonName }}</v-card-title>
                      <v-card-item>

                        <p class="mt-3 mb-3 mr-0">
                          <v-icon style="min-width: none;" icon="mdi-clock"></v-icon>
                          سانس :
                        </p>
                        <span class="mb-2" dir="ltr">{{ saloon.StartTime }}</span>
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

  <v-dialog v-model="show" width="auto" class="pa-0" max-width="600px" style="margin-left: 7rem; margin-right: 7rem;">
      <v-card>
        <v-card v-if="!clickedToVerify && !clickedSignUp && !isLoggedIn" class="mt-5" rounded="lg">
          <div dir="rtl" class="d-flex flex-row justify-space-between">
            <v-card-title dir="rtl" class="d-3 mt-10">برای خرید بلیت باید وارد شوید.</v-card-title>
            <v-icon @click="close" class="d-3 mt-10 ml-5" color="red" icon="mdi-close"></v-icon>
          </div>
          <v-row dir="rtl" class="mt-10 mb-5 mr-4 ml-2">

            <v-col cols="12" sm="8">
              <p class="mt-5">اگر در سینماتیکت حساب کاربری ندارید ثبت نام کنید.</p>
            </v-col>
            <v-col min-width="100px" cols="12" sm="6" md="4"><v-btn @click="goToRegister" variant="elevated" color="red"
                class="ml-0 mt-5" rounded="lg">ایجاد حساب
                کاربری </v-btn></v-col>

            <v-dialog v-model="showAlert" max-width="600px">
              <v-alert closable icon="$warning" text="شماره تلفن خود را وارد کنید." type="warning" dir="rtl"></v-alert>

            </v-dialog>
            <v-dialog v-model="noAcc" max-width="600px" max-height="400px">
              <v-alert prominent type="error" dir="rtl">
                <v-row align="center">
                  <v-col class="grow">
                    گرفتی ما رو؟؟ برو حساب باز کن
                  </v-col>
                  <v-col class="shrink">
                    <v-btn @click="goToRegister"> ایجاد حساب کاربری</v-btn>
                  </v-col>
                </v-row>
              </v-alert>
            </v-dialog>

          </v-row>

          <div dir="rtl" class="d-flex flex-wrap-reverse flex-column mt-14 mr-4 ml-4">
            <p>اگر در سینماتیکت حساب کاربری دارید، وارد شوید.</p>
            <v-form dir="rtl" class="d-flex flex-row flex-wrap justify-space-between mt-5">
              <v-text-field v-model="number" min-width="100px" class="ml-0 mb-3" dir="ltr" rounded="lg"
                placeholder="09xxxxxxxxx" append-inner-icon="mdi-cellphone"></v-text-field>

              <v-btn @click="goToVerify" min-width="50px" variant="elevated" rounded="lg" color="grey" type="submit"
                class="mt-2 ml-5" text="ورود"></v-btn>
            </v-form>
          </div>
          <!-- <p dir="rtl" class="text-red mr-3 mb-3" v-if="errorMessage">{{ errorMessage }}</p> -->
        </v-card>

        <v-card v-if="clickedToVerify && !clickedSignUp && !isLoggedIn" class="mx-auto mt-5" rounded="lg">
          <div dir="rtl" class="d-flex flex-row justify-space-between">
            <v-card-title dir="rtl" class="d-3 mt-10">برای خرید بلیت باید وارد شوید.</v-card-title>
            <v-icon @click="close" class="d-3 mt-10 ml-5" color="red" icon="mdi-close"></v-icon>
          </div>
          <v-col xs="12">
            <v-card dir="rtl" class="mx-auto mt-5" rounded="lg" max-width="700" min-height="200">
              <div style="margin-top: 2rem;" dir="rtl" class="d-flex flex-column mr-5">
                <p class="mr-4">کد وارد شده را وارد کنید</p>
                <v-form dir="rtl" class="d-flex flex-row justify-space-between mt-5">
                  <div id="form_area" class="d-flex flex-row justify-content-start mb-3">

                    <input v-model="otp" id="text_box" class="ml-0 mb-3" placeholder="کد تایید" min-width="200px">
                    <p class="box-p" v-if="seconds > 0">{{ seconds }}</p>
                    <button class="box" v-if="seconds <= 0" @click="restartTimer">ارسال مجدد</button>
                  </div>
                  <v-btn @click="goToScenelogin" min-width="100px" variant="elevated" rounded="lg" color="red"
                    type="submit" class="mt-3 ml-8 mr-3" text="ادامه"></v-btn>
                </v-form>
              </div>
              <!-- <p dir="rtl" class="text-red mr-3 mb-3" v-if="errorMessage">{{ errorMessage }}</p> -->
            </v-card>
          </v-col>
          <!-- <p dir="rtl" class="text-red mr-3 mb-3" v-if="errorMessage">{{ errorMessage }}</p> -->
          <v-dialog v-model="showAlert" max-width="600px">
            <v-alert closable icon="$warning" text=" کد ارسال شده را وارد کنید." type="warning" dir="rtl"></v-alert>
          </v-dialog>
        </v-card>

        <v-card v-if="clickedSignUp && !clickedToVerify && !isLoggedIn" class="mx-auto mt-5" rounded="lg">
          <div dir="rtl" class="d-flex flex-row justify-space-between">
            <v-card-title dir="rtl" class="d-3 mt-10">برای خرید بلیت باید وارد شوید.</v-card-title>
            <v-icon @click="close" class="d-3 mt-10 ml-5" color="red" icon="mdi-close"></v-icon>
          </div> <v-col xs="12">
            <v-card dir="rtl" class="mx-auto mt-5" rounded="lg" max-width="700" min-height="300">
              <h2 style="margin-top: 2rem;font-weight:bolder;" class="mb-5 mr-5 display-2">ایجاد حساب کاربری</h2>

              <div style="margin-top: 2rem;" dir="rtl" class="d-flex flex-column mr-5">
                <p class="mr-4">شماره موبایل خود را وارد کنید.</p>
                <v-form dir="rtl" class="d-flex flex-row justify-space-between mt-5">
                  <v-text-field v-model="numberSign" min-width="100px" class="ml-0 mb-3" dir="ltr" rounded="lg"
                    placeholder="09xxxxxxxxx" append-inner-icon="mdi-cellphone"></v-text-field>

                  <v-btn @click="goToVerify" variant="elevated" rounded="lg" color="red" type="submit" class="mt-3 ml-8"
                    text="ادامه"></v-btn>
                </v-form>
              </div>

            </v-card>
          </v-col>
          <v-dialog v-model="showAlert" max-width="600px">
            <v-alert closable icon="$warning" text="شماره تلفن خود را وارد کنید." type="warning" dir="rtl"></v-alert>

          </v-dialog>
          <v-dialog v-model="noAcc" max-width="600px" max-height="400px" min-width="300px">
            <v-alert prominent type="error" dir="rtl">
              <v-row align="center">
                <v-col class="grow">
                  گرفتی ما رو؟؟ برو حساب باز کن
                </v-col>
                <v-col class="shrink">
                  <v-btn @click="goToSign()"> ایجاد حساب کاربری</v-btn>
                </v-col>
              </v-row>
            </v-alert>
          </v-dialog>
        </v-card>

        <v-card v-if="clickedToVerify && clickedSignUp && !isLoggedIn" class="mx-auto mt-5" rounded="lg" min-height="300">
          <div dir="rtl" class="d-flex flex-row justify-space-between">
            <v-card-title dir="rtl" class="d-3 mt-10">برای خرید بلیت باید وارد شوید.</v-card-title>
            <v-icon @click="close" class="d-3 mt-10 ml-5" color="red" icon="mdi-close"></v-icon>
          </div> <v-col xs="12">
            <v-card dir="rtl" class="mx-auto mt-5" rounded="lg" max-width="700" min-height="200">
              <div style="margin-top: 2rem;" dir="rtl" class="d-flex flex-column mr-5">
                <p class="mr-4">کد وارد شده را وارد کنید</p>
                <v-form dir="rtl" class="d-flex flex-row justify-space-between mt-5">
                  <div id="form_area" class="d-flex flex-row justify-content-start mb-3">

                    <input v-model="otpSign" id="text_box" class="ml-0 mb-3" placeholder="کد تایید" min-width="100px">
                    <p class="box-p" v-if="seconds > 0">{{ seconds }}</p>
                    <button class="box" v-if="seconds <= 0" @click="restartTimer">ارسال مجدد</button>
                  </div>
                  <v-btn @click="goToScenelogin" min-width="100px" variant="elevated" rounded="lg" color="red"
                    type="submit" class="mt-3 ml-8 mr-3" text="ادامه"></v-btn>
                </v-form>
              </div>
              <!-- <p dir="rtl" class="text-red mr-3 mb-3" v-if="errorMessage">{{ errorMessage }}</p> -->
            </v-card>
          </v-col>
          <!-- <p dir="rtl" class="text-red mr-3 mb-3" v-if="errorMessage">{{ errorMessage }}</p> -->
          <v-dialog v-model="showAlertVerify" max-width="600px">
            <v-alert closable icon="$warning" text=" کد ارسال شده را وارد کنید." type="warning" dir="rtl"></v-alert>
          </v-dialog>
        </v-card>
      </v-card>






    </v-dialog>


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
import { ref, onMounted, watchEffect } from 'vue';
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
    const showAlert = ref(false)
    const showAlertRegister = ref(false)
    const showAlertVerify = ref(false)


    const submitRating = (rate) => {
      dialog.value = false
      console.log(rate)
      fetch('https://nramezon.shop/api/cinema/rating/add/' + route.params.id, {
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

    fetch('https://nramezon.shop/api/cinemas/' + route.params.id)
      .then(response => response.json())
      .then(data => {
        cinema.value = data.cinema
        features.value = data.features
      })

    console.log(cinema)
    console.log(features)
    const router = useRouter();

    const comments = ref([])
    fetch('https://nramezon.shop/api/cinema/comments/' + route.params.id)
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
    const todayF = new Date();
    const currentDateF = todayF.toISOString().split('T')[0];
    const firstApi = `https://nramezon.shop/api/cinema/movies/${route.params.id}?time=${currentDateF}`;

    fetch(firstApi)
      .then(response => response.json())
      .then(data => {
        scenes.value = data.scene
        console.log(scenes.value)
      })
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
            apiUrl = `https://nramezon.shop/api/cinema/movies/${route.params.id}?time=${currentDate}`;
            break;
          case 2:
            apiUrl = `https://nramezon.shop/api/cinema/movies/${route.params.id}?time=${tomorrowDate}`;
            break;
          case 3:
            apiUrl = `https://nramezon.shop/api/cinema/movies/${route.params.id}?time=${dayAfterTomorrowDate}`;
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
      const baseUrl = "/";
      const src = `${baseUrl}assets/cinema1/${id}.jpeg`;
      return src;
    };

    const getSrcMovie = (id) => {
      const baseUrl = "/";
      const src = `${baseUrl}assets/images/${id}.jpeg`;
      return src;
    }

    const findFeatureicon = (value) => {
      console.log(value)
      if (value === 'ghaza') {
        return 'mdi-food'
      } else if (value === 'asansor') {
        return 'mdi-elevator'
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
      } else if (value === 'elevator' || value === 'asansor') {
        return 'آسانسور'
      }
    }



    const cookieStorage = {
      getItem: (item) => {
        const cookies = document.cookie
          .split(';')
          .map(cookie => cookie.split('='))
          .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});
        return cookies[item];
      },
      setItem: (item, value) => {
        document.cookie = `${item}=${value};`
      },
      removeItem: (item) => {
        document.cookie = `${item}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    }

    const number = ref('');
    const uidS = ref();
    const uidL = ref()
    const isLoggedIn = ref(false)
    const storageType = cookieStorage;
    const consentPropertyName = 'token';
    const getCookie = () => storageType.getItem(consentPropertyName);
    const saveToStorage = () => storageType.setItem(consentPropertyName, tokenValue.value);
    const tokenValue = ref()

    onMounted(() => {
      isLoggedIn.value = getCookie()
    })

    const show = ref(false);
    const noAcc = ref(false);
    const gotoSeat = (index) => {
      console.log(isLoggedIn)
      clickedSignUp.value = false
      clickedToVerify.value = false
      if (isLoggedIn.value) {
        router.push({ name: 'SeatSelect', params: { id: index } })
      }
      else {
        show.value = true
      }
    };

    const showError = () => {
      noAcc.value = true;
    }

    const clickedToVerify = ref(false)
    const numberSign = ref()

    const clickedSignUp = ref(false)
    const goToVerify = (event) => {
      event.preventDefault();
      showAlert.value = false

      if (number.value) {
        fetch('https://nramezon.shop/api/login', {
          method: 'POST',
          body: JSON.stringify({ PhoneNumber: number.value }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            if (!response.ok) {
              showError();
              throw new Error();
            }
            console.log(response)
            return response.json(); // Parse the response as JSON
          })
          .then(data => {
            console.log(data)
            uidL.value = data.uuid; // Get the uid from the response

          })
          .catch(error => {
            console.error(error);
          });

        clickedToVerify.value = true
        console.log(clickedToVerify.value)

      } else if (numberSign.value) {
        // errorMessage.value = 'شماره تلفن خود را وارد کنید.';
        // window.alert(errorMessage.value);
        fetch('https://nramezon.shop/api/signup', {
          method: 'POST',
          body: JSON.stringify({ PhoneNumber: numberSign.value }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Error number sign up');
            }
            console.log(response)
            return response.json(); // Parse the response as JSON
          })
          .then(data => {
            console.log(data)
            uidS.value = data.uuid; // Get the uid from the response
            console.log('UID:', uidS.value);
          })
          .catch(error => {
            console.error('Error sign up :', error);
          });

        clickedToVerify.value = true


      } else if (!number.value) {

        showAlert.value = true
      } else {
        showAlert.value = true
      }
    };

    const otp = ref('')
    const otpSign = ref('')

    const goToScenelogin = (event) => {
      event.preventDefault();

      if (otp.value) {
        fetch('https://nramezon.shop/api/verify_login/' + uidL.value, {
          method: 'POST',
          body: JSON.stringify({ OTP: otp.value }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Error verify login');
            }
            return response.json(); // Parse the response as JSON
          })
          .then(text => {
            console.log('Response:', text); // Log the response text
            tokenValue.value = text.token
            saveToStorage(storageType);
            show.value = false
            location.reload()
          })
          .catch(error => {
            console.error('Error verify login:', error);
          });
      } else if (otpSign.value && clickedSignUp) {

        console.log(otpSign.value)
        fetch('https://nramezon.shop/api/verify_signup/' + uidS.value, {
          method: 'POST',
          body: JSON.stringify({ OTP: otpSign.value }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Error verify login');
            }
            return response.json(); // Parse the response as JSON
          })
          .then(text => {
            console.log('Response:', text); // Log the response text
            tokenValue.value = text.token
            console.log(tokenValue.value)
            saveToStorage(storageType);
            show.value = false
            location.reload()
          })
          .catch(error => {
            console.error('Error verify login:', error);
          });
      } else if (!otp.value) {

        showAlertVerify.value = true
      } else {
        showAlertVerify.value = true
      }


    };


    const goToRegister = () => {
      clickedSignUp.value = true;
    }


    const seconds = ref(59);
    let timeoutId;

    const startTimer = () => {
      timeoutId = setTimeout(updateNumber, 1000);
    };

    const updateNumber = () => {
      if (seconds.value === 0) {
        clearTimeout(timeoutId);
      } else {
        seconds.value -= 1;
        timeoutId = setTimeout(updateNumber, 1000);
      }
    };


    const restartTimer = (event) => {
      event.preventDefault(); // Prevent default form submission behavior
      console.log(uidL.value, uidS.value)
      clearTimeout(timeoutId);
      seconds.value = 59; // Reset the countdown to its initial value
      startTimer(); // Start the timer immediately

      if (uidL.value) {
        fetch('https://nramezon.shop/api/resend_otp/' + uidL.value, {
          method: 'POST',
          body: JSON.stringify(),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Error resend verify login');
            }
            return response.json(); // Parse the response as JSON
          })
          .then(text => {
            console.log('Response:', text); // Log the response text
          })

      } else if (uidS.value) {
        fetch('https://nramezon.shop/api/resend_otp/' + uidS.value, {
          method: 'POST',
          body: JSON.stringify(),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Error resend verify login');
            }
            return response.json(); // Parse the response as JSON
          })
          .then(text => {
            console.log('Response:', text); // Log the response text
          })

      }



    };

    watchEffect(() => {
      if (clickedToVerify.value && !isLoggedIn.value) {
        startTimer()
      }
    });


    const close = () => {
      show.value = false
    }


    return {
      cinema, comments, scenes, handleClick, currentHour, currentMinute, updateHour, calculateMinute, calculateHour, jalaliDay, formatDigit,
      jalaliMonth, jalaliDayAfterTomorrowDay, jalaliDayAfterTomorrowMonth, jalaliTomorrowDay, jalaliTomorrowMonth, cinemaScenes, cinemaSaloons, dialog,
      isItemOpen, gotoSeat, getSrc, conditions, getSrcMovie, features, findFeatureicon, findFeatureValue, handleTab, submitRating, rate1, rate2, rate3, rate4, rate5, isLoggedIn, showError, show, noAcc,
      goToVerify, number, clickedToVerify, goToScenelogin, otp, seconds, restartTimer, goToRegister, clickedSignUp, numberSign, otpSign, showAlert, showAlertRegister, close, showAlertVerify
    }
  }
}
</script>
