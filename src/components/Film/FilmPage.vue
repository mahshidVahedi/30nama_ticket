<template>
  <v-img :src="getSrc(film.id)" dir="rtl" class="align-center mb-0 pa-0"
    gradient="to bottom, rgba(0,0,0,.7), rgba(2,8,0,1)" cover max-height="300px">
    <div dir="rtl" class="d-flex flex-row justify-center align-center mr-0 ml-0 opacity-background">
      <v-card variant="text" height="100%" width="100%"
        class="d-flex flex-row justify-content-start align-center text-white g-0 ms-0" cover>
        <v-img :src="getSrc(film.id)" style="max-height: 200px;max-width: 400px;border-radius: 10%;" rounded="5"
          class="mt-5 mb-5"></v-img>
        <div class="mr-0">
          <v-card-title class="text-h6 font-weight-bold mb-5" dir="rtl">
            <span class="text-wrap">{{ film && film.name }}</span> | <span class="text-subtitle-1">{{ director.name
            }}</span>
          </v-card-title>
          <v-card-text dir="rtl">
            <div class="mt-3 mb-3">
              {{ film && film.genre }}
            </div>
            <div class="d-flex flex-column mt-3 ">
              <div color="red" class="d-flex flex-row border-white mt-3 me-6 text-h6">
                <v-icon class="ms-5" color="red" icon="mdi-heart"></v-icon>
                <div class="text-red ms-1 font-weight-bold text-h6">
                  {{ film && film.score }}
                </div>
                <v-chip @click="dialog = true" class="ms-3" color="white" prepend-icon="mdi-star">
                  امتیاز شما
                </v-chip>
              </div>
              <div class="d-flex flex-row mt-5">
                <div v-for="(actor, i) in film && film.actors" :key="i" class="mr-5 ml-5">
                  <div class="d-flex align-items-center">
                    <v-img :src="actor.photo" width="50px" height="50px" class="mr-2 rounded-lg"
                      style="object-fit: cover;"></v-img>
                    <span class="ma-4">{{ film && actor.name }}</span>
                  </div>
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
      <v-card-title class="text-wrap mt-2" dir="rtl">امتیاز شما به {{ film.name }}</v-card-title>
      <v-card-text dir="rtl">
        <v-card dir="rtl" variant="outlined" class="mt-2">
          <v-card-text>
            <v-icon class="ms-5" color="red" icon="mdi-heart"></v-icon>
            <span>1/5:</span> اصلا فیلم خوبی نبود
          </v-card-text>
        </v-card>
        <v-card dir="rtl" variant="outlined" class="mt-2">
          <v-card-text>
            <v-icon class="ms-5" color="red" icon="mdi-heart"></v-icon>
            <span>2/5:</span> فیلم خوبی نبود ولی قابل تحمل بود
          </v-card-text>
        </v-card>
        <v-card dir="rtl" variant="outlined" class="mt-2">
          <v-card-text>
            <v-icon class="ms-5" color="red" icon="mdi-heart"></v-icon>
            <span>3/5:</span> فیلم متوسطی بود، نه خیلی خوب و نه خیلی بد
          </v-card-text>
        </v-card>
        <v-card dir="rtl" variant="outlined" class="mt-2">
          <v-card-text>
            <v-icon class="ms-5" color="red" icon="mdi-heart"></v-icon>
            <span>4/5:</span> فیلم خوبی بود، اما میتوانست بتر باشد
          </v-card-text>
        </v-card>

        <v-card dir="rtl" variant="outlined" class="mt-2">
          <v-card-text>
            <v-icon class="ms-5" color="red" icon="mdi-heart"></v-icon>
            <span>5/5:</span> عالی بود! انتظاراتم برآورده شد
          </v-card-text>
        </v-card>
      </v-card-text>
      <v-card-actions><v-btn variant="elevated" class="mt-2 mr-3" color="red" block @click="dialog = false">ثبت
          نظر</v-btn></v-card-actions>

    </v-card>
  </v-dialog>
  <div dir="rtl" style="background-color: rgb(235, 235, 235);" class="pa-6">
    <div dir="rtl" class="ma-4">
      <h3>
        درباره {{ film && film.name }}
      </h3>
      <p class="ma-4">
        {{ film && film.description }}
      </p>
      <p class="ma-4">
        خلاصه داستان: {{ film && film.summery }}
      </p>
      <h4>
        بازیگران {{ film && film.name }}
      </h4>
      <v-row>
        <v-col cols="12" sm="6" md="2" v-for="(actor, index) in film && film.cast" :key="index">
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
      <h2 class="ma-4 text-black font-weight-bold">برنامه اکران {{ film && film.name }}</h2>
      <v-card>
        <v-tabs id="tabs" v-model="tab" color="deep-grey-accent-4 flex-xs-column" align-tabs="start" class=" mt-5 mb-5">
          <v-tab :value="1">{{ jalaliDay }} {{ jalaliMonth }}</v-tab>
          <v-tab :value="2">{{ jalaliTomorrowDay }} {{ jalaliTomorrowMonth }}</v-tab>
          <v-tab :value="3">{{ jalaliDayAfterTomorrowDay }} {{ jalaliDayAfterTomorrowMonth }}</v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item v-for="n in 3" :key="n" :value="n">
            <div class="mt-10 ml-0" v-for="scene in scenes" :key="scene.id">
              <v-card dir="rtl" variant="text" class="mr-10 ml-10 pt-0">
                <v-row class="flex-lg-row flex-s-column justify-content-between">
                  <v-col col="9">
                    <v-row class="flex-lg-row flex-s-column justify-content-start">
                      <v-col>
                        <v-responsive :aspect-ratio="16 / 9">
                          <v-img class="rounded-4"
                            style="max-height: 300px;max-width: 200px; min-height: 100px; min-width: 100px;"
                            :src="getSrcCinema(scene.cinema.id)"></v-img>
                        </v-responsive>
                      </v-col>
                      <v-col>
                        <div style="max-width: 100%;" class="d-flex flex-column mr-0 mt-5">
                          <v-card-title class="text-h6 font-weight-bold text-wrap" dir="rtl">{{ scene.cinema.name
                          }}</v-card-title>
                          <v-card-text dir="rtl">
                            <div class="mt-3 mb-3">
                              {{ scene.cinema.location }}
                            </div>
                            <div class="d-flex flex-row mt-3 ">
                              <div color="red" class="d-flex flex-row border-white mt-3 me-3">
                                <v-icon class="ms-5" color="red" icon="mdi-heart"></v-icon>
                                <div class="text-red ms-1">
                                  {{ scene.cinema.score }}
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
                    v-if="isItemOpen(j) && (currentHour + calculateHour(film.duration * j + currentMinute + 30)) <= 23"
                    class="ml-10 mt-5 mr-10 elevation-8 pl-5 pr-5" variant="text" style="min-width: 100px ;">
                    <div class="d-flex flex-column">
                      <div class="ml-3 mr-3">
                        <v-card-item>
                          <p class="mt-3 mb-3 mr-0">
                            <v-icon style="min-width: none;" icon="mdi-clock"></v-icon>
                            سانس {{ scene.startTime }}
                          </p>
                          <v-card-subtitle>
                            60000 تومان
                          </v-card-subtitle>
                        </v-card-item>
                      </div>
                      <v-btn @click="gotoSeat()" class="mt-2 mr-5 mb-3" prepend-icon="mdi-ticket" variant="flat"
                        color="red">
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
    <div dir="rtl" class="mt-16 ml-8 mr-8 mb-10 ml-0 pa-4 rounded d-flex flex-column"
      style="background-color: white; margin-bottom: 300px;border-radius: 10px;">
      <h2 dir="rtl" class="mt-5 mb-8 mr-3 pt-5 text-grey font-weight-bold">دیدگاه کاربران درباره {{ film.name }}
      </h2>
      <v-container dir="rtl" class="text-right text-black mb-10 ml-10">
        <v-textarea v-model="comment" bg-color="rgb(221, 221, 221)" color="black" dir="rtl" class="text-right"
          placeholder="دیدگاه شما..."></v-textarea>
        <v-btn @click="submitComment" min-width="150px" text="ثبت دیدگاه" color="red" class="mt-5 ml-10 pr-0 pl-0"
          prepend-icon="mdi-plus" style="width: 20%;" dir="rtl"></v-btn>

      </v-container>

      <div class="mt-5 mb-5" v-for="comment in comments " :key="comment.id">
        <v-card>
          <v-card-subtitle>
            {{ comment.name }}
          </v-card-subtitle>

          <v-card-text>
            {{ comment.comment }}
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

/* #my-textarea{
  background-color: rgb(221, 221, 221);
  max-height: 10%!important;
} */

.no-fill {
  background-color: transparent !important;
}

.v-icon.mdi-seat {
  color: green;
  font-size: 24px;
}

.v-icon.mdi-seat-occupied {
  color: red;
  font-size: 24px;
}

.scene {
  width: 300px;
  height: 40px;
  background-color: #807e7e;
  margin: auto;
  border-radius: 10px;
  text-align: center;
  padding-top: 8px;
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
import { ref, onMounted, computed } from 'vue';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import { useRouter, useRoute } from 'vue-router';
import router from '@/router';
export default {
  data: () => ({
    tab: null,
    path: mdiWifi,
    rules: [v => v.length <= 500 || 'حداکثر 500 کاراکتر'],
    value: '',
    dialog: false
  }),
  setup() {


    const gotoSeat = () => {
      router.push({ name: 'SeatSelect' })
    };

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

    // const scenes = [
    //   {
    //     id: 1,
    //     movie_id: 1,
    //   },
    //   {
    //     id: 4,
    //     movie_id: 2,
    //   },
    //   {
    //     id: 2,
    //     movie_id: 2,
    //   },
    //   {
    //     id: 3,
    //     movie_id: 3,
    //   }

    // ]

    const openItems = ref([]);

    function handleClick(itemId) {
      scenes[itemId].condition = !scenes[itemId].condition;
      if (!isItemOpen(itemId) && scenes[itemId].condition) {
        openItems.value.push(itemId);
      } else if (!scenes[itemId].condition) {
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
    });

    const cinemaScenes = ref([])
    const cinemaSaloons = ref([])

    const route = useRoute();
    const film = ref({});
    const director = ref({})
    const comments = ref([])

    console.log(route.params.id)

    fetch('http://185.128.40.150:8080/api/movies/' + route.params.id)
      .then(response => response.json())
      .then(data => {
        film.value = data.movie
        director.value = data.movie.director
      })

    console.log(director)

    fetch('http://185.128.40.150:8080/api/movie/comments/'+route.params.id)
    .then(response => response.json())
    .then(data => {comments.value = data.comments})

    console.log(comments)

    const scenes = ref([]);

    fetch('http://185.128.40.150:8080/api/movie/cinemas/' + route.params.id)
      .then(response => response.json())
      .then(data => {
        // Add a condition property to each scene
        scenes.value = data.scene.map(scene => ({
          ...scene,
          condition: false // Replace this with your condition logic
        }));
        console.log(scenes.value); // Logging the modified scenes array
      })
      .catch(error => console.error('Error fetching data:', error));
    const router = useRouter();
    const comment = ref('');
    const submitComment = () => {
      // Make the POST request to the backend
      fetch('http://185.128.40.150:8080/api/movie/comment/add/' + route.params.id, {
        method: 'POST',
        body: JSON.stringify({ comment: comment.value , name: 'w', }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error submitting comment');
          }
          return response.text(); // Get the response text
        })
        .then(text => {
          console.log('Response:', text); // Log the response text
          const data = JSON.parse(text); // Try parsing the response as JSON
          console.log('Comment submitted:', data);
          comment.value = '';
        })
        .catch(error => {
          console.error('Error submitting comment:', error);
        });
    };
    const sceneCinemas = ref([])
    const handleScne = (movie_id, scene, cinema_id) => {
      scenes.forEach
    }
    const getSrc = (id) => {
      const src = `/src/assets/images/${id}.jpeg`
      return src;
    }

    const getSrcCinema = (id) => {
      const src = `/src/assets/cinema1/${id}.jpg`
      return src;
    }
    return {
      scenes, cinemas, director, comments, film, scenes, handleClick, currentHour, currentMinute, updateHour, calculateMinute, calculateHour, jalaliDay, formatDigit,
      jalaliMonth, jalaliDayAfterTomorrowDay, jalaliDayAfterTomorrowMonth, jalaliTomorrowDay, jalaliTomorrowMonth, handleScne, cinemaScenes, cinemaSaloons,
      isItemOpen, getSrc, getSrcCinema, comment, submitComment,
    }
  }
}
</script>
