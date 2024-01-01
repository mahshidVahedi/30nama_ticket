

<template style="background-color: rgb(235, 235, 235);" dir="rtl" >
    <div style="background-color: rgb(235, 235, 235);">
        <h2 dir="rtl" class="text-h6 ps-10 pl-0 pt-10 font-weight-bold"><b>اطلاعات بلیت و پرداخت</b></h2>
        
<v-container>
            <v-row dir="rtl">
            
            <v-col >
                <v-container>
                    <v-card :rounded="4" variant="flat"
                    class=" mt-10">
                    <v-row dir="rtl" class="flex-column flex-md-row justify-content-start justify-sm-center align-start">
                        <v-col cols="4">

                                <v-img :rounded="4"
                                    style="max-height: 250px;max-width: 200px; min-height: 100px; min-width: 100px;"
                                    class="mt-5 ml-0 ms-5" src='@/assets/images/hotel.jpeg'></v-img>
                        </v-col>
                        <v-col >
                            <div class="d-flex flex-column mr-0 mt-4">
                                <v-card-title class="text-h6 font-weight-bold" dir="rtl">{{ info.filmName }}</v-card-title>
                                <v-card-text dir="rtl">
                                    <div class="d-flex flex-column mt-3 ">
                                        <div class="d-flex flex-row mt-3 me-3 rounded-pill border-white">
                                            <v-icon class="me-1 " icon="mdi-crosshairs-gps"></v-icon>
                                            {{ info.cinema }}
                                        </div>
                                        <div dir="rtl" class="d-flex flex-row border-white mt-5">
                                            <v-icon icon="mdi-clock"></v-icon>
                                            <div class="ms-1">
                                                سانس {{ info.scene.minute }} : {{ info.scene.hour }}
                                            </div>
                                            <div class="d-flex flex-row border-white">
                                                <v-icon class="ms-5" icon="mdi-clock"></v-icon>
                                                <div class="ms-1">
                                                    {{ info.selectedDate.day }} {{ info.selectedDate.month }}
                                                </div>
                                            </div>

                                        </div>


                                    </div>

                                </v-card-text>
                            </div>

                        </v-col>
                    </v-row>

                    <div  dir="rtl">
                        <h3 class="mr-5 mb-5 mt-8">موقعیت صندلی :</h3>
                        <div id="chairs" class="d-flex flex-row">
                            <div v-for="(seat, i) in info.selectedSeats" :key="i" class="mr-5 mb-5 d-flex flex-row">
                                <v-chip class=""> ردیف {{ seat.row }} صندلی {{ seat.seat }}</v-chip>


                            </div>
                        </div>
                            
                        <div class="mr-5 mb-5 mt-5">کد رزرو : <span style="color:#3baea0;" class="font-weight-bold">{{ info.reserveCode }}</span></div>

                    </div>

                </v-card>
                </v-container>
            
            </v-col>

            <v-col  >
                <v-container >
                    <v-card :rounded="4" variant="flat" class="d-flex flex-column justify-content-start ml-10  ms-2 mt-10">
                        <v-card-text dir="rtl" id="dash" class="d-flex flex-row justify-space-between mt-5 pb-5 ">
                            
                                <p class="ms-0">مجموع هزینه</p>
                                <p class="ms-7">{{ info.number * 60000 * 0.04 + info.number * 60000 }} تومان</p>

                    </v-card-text>
                    <v-card-text dir="rtl" class="d-flex flex-row justify-space-between mb-5">
                        <p class="ms-0">بلیت</p>
                        <p class="ms-7">{{info.number}} عدد</p>
                        <p class="ms-7">{{ info.number * 60000 * 0.04 + info.number * 60000 }} تومان</p>
                    </v-card-text>
                </v-card>
                </v-container>
                
                
                <v-btn @click="goToHome" class="mt-10 ms-2 mb-10" color="red">بازگشت به صفحه اصلی</v-btn>
            </v-col>

        </v-row>
</v-container>
        
    </div>
</template>

<style>

#chairs,#dash{
    border-bottom: dashed rgb(211, 210, 210);
}

</style>



<script lang="js">
import image1 from '@/assets/images/hotel.jpeg'
import { ref,watch } from 'vue'
import { useRouter, useRoute } from 'vue-router';

export default {

    setup() {

        const router = useRouter();

        const goToHome = () => {
            router.push({ name: 'Home' });
        };

        const info = ref({
            image: image1,
            filmName: 'هتل',
            number: 3,
            cinema: 'پردیس سینمایی کورش',
            selectedDate: {
                day: 30,
                month: 'دی'
            },
            scene: {
                hour: 23,
                minute: 50,
                saloonId: 4
            },
            selectedSeats: [
                {
                    seat: 8,
                    row: 9,
                },
                {
                    seat: 9,
                    row: 9
                },
                {
                    seat: 10,
                    row: 9
                }
            ],
            reserveCode:80025282



        })


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

        return { info, image1,checkbox1, checkbox2,goToHome }
    }
}
</script>