<template style="background-color: rgb(235, 235, 235);" dir="rtl" >
  <div style="background-color: rgb(235, 235, 235); " class="pa-0 ml-0">
    <h2 dir="rtl" class="text-h6 ps-10 pl-0 pt-10 font-weight-bold"><b>اطلاعات بلیت و پرداخت</b></h2>

    <v-container>
      <v-row dir="rtl">

        <v-col>
          <v-container>
            <v-card :rounded="4" variant="flat" class=" mt-10">
              <v-row dir="rtl" class="flex-column flex-md-row justify-content-start justify-sm-center align-start">
                <v-col cols="4">

                  <v-img :rounded="4" style="max-height: 250px;max-width: 200px; min-height: 100px; min-width: 100px;"
                    class="mt-5 ml-0 ms-5" :src="getSrc(movie.id)"></v-img>
                </v-col>
                <v-col>
                  <div class="d-flex flex-column mr-0 mt-4">
                    <v-card-title class="text-h6 font-weight-bold" dir="rtl">{{ movie.name }}</v-card-title>
                    <v-card-text dir="rtl">
                      <div class="d-flex flex-column mt-3 ">
                        <div class="d-flex flex-row mt-3 me-3 rounded-pill border-white">
                          <v-icon class="me-1 " icon="mdi-crosshairs-gps"></v-icon>
                          {{ cinema.name }} - {{ salon.name }}
                        </div>
                        <div dir="rtl" class="d-flex flex-row border-white mt-5">
                          <v-icon icon="mdi-clock"></v-icon>
                          <div class="ms-1">
                            سانس {{ scene.startTime }}
                          </div>

                        </div>


                      </div>

                    </v-card-text>
                  </div>

                </v-col>
              </v-row>

              <hr class="ms-3 me-3 mt-5 mb-3" style="color: beige;">
              <div dir="rtl">
                <h3 class="mr-5 mb-5">{{ count }} صندلی برای شما</h3>
                <v-row class="d-flex flex-row">
                  <v-col v-for="(ticket, i) in preTicket" :key="i" cols="12" md="5" class="mr-5 mb-5 d-flex flex-row">
                    <v-chip class=""> ردیف {{ ticket.seatX }} صندلی {{ ticket.seatY }}</v-chip>
                  </v-col>
                </v-row>
              </div>
            </v-card>
            <v-dialog v-model="alert" max-width="600px" max-height="400px" min-width="300px">
              <v-alert  prominent type="error" dir="rtl">
                <v-row align="center">
                  <v-col class="grow">
                    شوخیه مگ بذاری بری بعد بیای؟؟؟؟ برگرد صفحه اصلی
                  </v-col>
                  <v-col class="shrink">
                    <v-btn @click="goToHome()">صفحه اصلی</v-btn>
                  </v-col>
                </v-row>
              </v-alert>
            </v-dialog>
          </v-container>
          <v-container>
            <v-card dir="rtl" variant="flat" :rounded="4" class="mt-7">
              <v-card-title>قوانین خرید بلیت</v-card-title>
              <v-card-text>
                <v-icon icon="mdi-circle" color="red" class="d-5 mr-2" style="font-size: 10px;"></v-icon>
                تا ۲ ساعت قبل از شروع سانس و در صورتی که بلیت را در محل سینما چاپ نکرده باشید، می‌توانید

                بلیت خود را بدون کسر وجه لغو کنید. مبلغ آن به حساب کاربری شما در سینماتیکت واریز خواهد
                شد.</v-card-text>

              <v-card-text>
                <v-icon icon="mdi-circle" color="red" class="d-5 mr-2 ml-2" style="font-size: 10px;"></v-icon>فیلم
                در صورتی اکران میشود که حداقل ۵ بلیت فروش رفته باشد.</v-card-text>
              <v-card-text><v-icon icon="mdi-circle" color="red" class="d-5 mr-2" style="font-size: 10px;"></v-icon>
                برای دریافت بلیت خود ۱۵ دقیقه قبل از شروع سانس به گیشه یا کیوسک های سینماتیکت مراجعه فرمایید.
              </v-card-text>
              <v-card-text><v-icon icon="mdi-circle" color="red" class="d-5 mr-2 ml-2" style="font-size: 10px;"></v-icon>
                کاربر موظف است اطلاعات شخصی واقعی و صحیح خود را در سایت وارد نماید. سایت سینماتیکت مسئولیتی
                در قبال هرگونه مشکل احتمالی که در اثر ارائه اطلاعات غلط از طرف کاربر به این سایت، ایجاد شده است،
                ندارد.</v-card-text>


            </v-card>
          </v-container>
        </v-col>

        <v-col>
          <v-container>
            <v-card :rounded="4" variant="flat" class="d-flex flex-column justify-content-start mt-10">
              <v-card-title class="font-weight-bold mt-5" dir="rtl">جزئیات پرداخت</v-card-title>
              <v-card-text dir="rtl" class="d-flex flex-row justify-space-between mt-8">
                <p>{{ count }} عدد بلیت</p>
                <p>{{ count * 60000 }} تومان</p>
              </v-card-text>
              <v-card-text dir="rtl" class="d-flex flex-row justify-space-between">
                <p class="ms-0">کارمزد خرید آنلاین</p>
                <p class="ms-7">4%</p>
                <p class="ms-7">{{ count * 60000 * 0.04 }} تومان</p>
              </v-card-text>
              <hr class="ms-3 me-3 mt-3" style="color: beige;">
              <v-card-text dir="rtl" class="d-flex flex-row justify-space-between">
                <p class="ms-0">مبلغ قابل پرداخت</p>
                <p class="ms-7">{{ count * 60000 * 0.04 + count * 60000 }} تومان</p>
              </v-card-text>
            </v-card>
          </v-container>


          <div class="d-flex flex-row">
            <v-container>
              <v-card variant="flat" class="mt-7 d-flex flex-row">
                <v-checkbox v-model="checkbox1" color="success" class="mr-5"></v-checkbox>
                <v-card-text>درگاه ملت</v-card-text>
              </v-card>
            </v-container>

            <v-container>

              <v-card variant="flat" class="mt-7 d-flex flex-row">
                <v-checkbox v-model="checkbox2" color="success" class="mr-5"></v-checkbox>
                <v-card-text>درگاه سامان</v-card-text>
              </v-card>

            </v-container>
          </div>
          <v-btn @click="goToTicket()" class="mt-10 ms-2" color="red">پرداخت و دریافت بلیت </v-btn>
        </v-col>

      </v-row>
    </v-container>
    <div style="height: 5rem; width: 100%;"></div>

  </div>
</template>


<script lang="js">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import router from '@/router';

export default {

  // data () {
  //   return {
  //     checkbox1: true,
  //     checkbox2: false,
  //   }
  // },
  setup() {


    const preTicket = ref([]);
    const scene = ref({});
    const movie = ref({});
    const cinema = ref({});
    const salon = ref({});
    const route = useRoute();
    const alert = ref(false);
    const tokenUrl = route.params.token;
    const count = ref()
    fetch('https://nramezon.shop/api/ticket/token/pre/' + tokenUrl)
      .then(response => response.json())
      .then(data => {
        count.value = data.count;
        preTicket.value = data.tickets;
        scene.value = data.tickets[0].scene;
        movie.value = data.tickets[0].scene.movie;
        cinema.value = data.tickets[0].scene.cinema;
        salon.value = data.tickets[0].scene.saloon;

      });

    const checkbox1 = ref(true);
    const checkbox2 = ref(false);

    watch(checkbox1, (newValue) => {
      checkbox2.value = !newValue;
    });

    watch(checkbox2, (newValue) => {
      checkbox1.value = !newValue;
    });

    const goToTicket = () => {
      fetch('https://nramezon.shop/api/preticket/confirm/' + tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            showError();
            throw new Error();
          }
          return response.text();
        })
        .then(text => {
          console.log('Response:', text);
          const data = JSON.parse(text);
          console.log(data);
          router.push('/ticket/token/rea/' + data.token);
        })
    };
    const getSrc = (id) => {
      const baseUrl = "/";
      const src = `${baseUrl}assets/images/${id}.jpeg`;
      return src;
    }
    const showError = () => {
      alert.value = true;
      console.log(alert);
    }
    const goToHome = () => {
      router.push('/');
      alert.value = false;
    }

    return { checkbox1, checkbox2, goToTicket, preTicket, movie, salon, scene, cinema, getSrc, count, showError, alert, goToHome };

  }
}
</script>
<style>
.error{
  width: 40%;
  height: 40%;
}
</style>
