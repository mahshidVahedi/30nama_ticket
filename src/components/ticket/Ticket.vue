<template style="background-color: rgb(235, 235, 235);" dir="rtl" >
  <div style="background-color: rgb(235, 235, 235);">
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
                    <v-card-title class="text-h6 font-weight-bold text-wrap" dir="rtl">{{ movie.name }}</v-card-title>
                    <v-card-text dir="rtl">
                      <div class="d-flex flex-column mt-3 ">
                        <div class="d-flex flex-row mt-3 me-3 rounded-pill border-white">
                          <v-icon class="me-1 " icon="mdi-crosshairs-gps"></v-icon>
                          {{ cinema.name }}
                        </div>
                        <div dir="rtl" class="d-flex flex-row border-white mt-5">
                          <v-icon icon="mdi-clock"></v-icon>
                          <div class="ms-1">
                            سانس {{ scene.startTime }}
                          </div>
                          <!-- <div class="d-flex flex-row border-white">
                            <v-icon class="ms-5" icon="mdi-clock"></v-icon>
                            <div class="ms-1">
                              {{ info.selectedDate.day }} {{ info.selectedDate.month }}
                            </div>
                          </div> -->

                        </div>


                      </div>

                    </v-card-text>
                  </div>

                </v-col>
              </v-row>

              <div dir="rtl">
                <h3 class="mr-5 mb-5 mt-8">موقعیت صندلی :</h3>
                <div id="chairs" class="d-flex flex-row">
                  <div v-for="(ticket, i) in tickets" :key="i" class="mr-5 mb-5 d-flex flex-row">
                    <v-chip class=""> ردیف {{ ticket.seatX }} صندلی {{ ticket.seatY }}</v-chip>
                  </div>
                </div>
                <div class="mr-5 mb-5 mt-5">کد رزرو : <span style="color:#3baea0;" class="font-weight-bold">
                {{ reserveCode }}</span></div>
              </div>
            </v-card>
          </v-container>

        </v-col>

        <v-col>
          <v-container>
            <v-card :rounded="4" variant="flat" class="d-flex flex-column justify-content-start ml-10  ms-2 mt-10">
              <v-card-text dir="rtl" id="dash" class="d-flex flex-row justify-space-between mt-5 pb-5 ">

                <p class="ms-0">مجموع هزینه</p>
                <p class="ms-7">{{  count* 60000 * 0.04 + count * 60000 }} تومان</p>

              </v-card-text>
              <v-card-text dir="rtl" class="d-flex flex-row justify-space-between mb-5">
                <p class="ms-0">بلیت</p>
                <p class="ms-7">{{ count }} عدد</p>
                <p class="ms-7">{{ count * 60000 * 0.04 + count * 60000 }} تومان</p>
              </v-card-text>
            </v-card>
          </v-container>
          <v-btn @click="goToHome" class="mt-10 ms-2 mb-10" color="red">بازگشت به صفحه اصلی</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <div style="height:100px"></div>
  </div>
</template>

<style>
#chairs,
#dash {
  border-bottom: dashed rgb(211, 210, 210);
}
</style>

<script lang="js">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router';

export default {

  setup() {

    const router = useRouter();

    const goToHome = () => {
      router.push({ name: 'Home' });
    };
    const tickets = ref([]);
    const scene = ref({});
    const movie = ref({});
    const cinema = ref({});
    const salon = ref({});
    const count = ref();
    const route = useRoute();
    const reserveCode = ref()
      fetch('http://185.128.40.150:8080/api/ticket/token/rea/' + route.params.token)
        .then(response => response.json())
        .then(data => {
          count.value = data.count
          tickets.value = data.tickets;
          scene.value = data.tickets[0].scene;
          movie.value = data.tickets[0].scene.movie;
          cinema.value = data.tickets[0].scene.cinema;
          salon.value = data.tickets[0].scene.saloon;
          reserveCode.value = data.tickets[0].reserveCode
        });



      // const handleCheckbox = ()=>{
      //     if(this.checkbox1){
      //         this.checkbox2=!this.checkbox2;
      //     }

      //     else if(this.checkbox2){
      //         this.checkbox1=!this.checkbox1;
      //     }
      // }

      const checkbox1 = ref(true);
      const checkbox2 = ref(false);

      // Watch the value of checkbox1 and update checkbox2 accordingly
      watch(checkbox1, (newValue) => {
        checkbox2.value = !newValue;
      });

      // Watch the value of checkbox2 and update checkbox1 accordingly
      watch(checkbox2, (newValue) => {
        checkbox1.value = !newValue;
      });
      const getSrc = (id) => {
        const src = `/src/assets/images/${id}.jpeg`
        return src;
      }

      return { checkbox1, checkbox2, goToHome, tickets, movie, salon, scene, cinema, getSrc,count,reserveCode }
    }
}
</script>
