
<template style="background-color: rgb(235, 235, 235); height:100%" :dir="rtl" >
    <div class="mt-10" style="background-color: rgb(235, 235, 235);">
        <h2 dir="rtl" class="text-h6 mt-10 ms-10 font-weight-bold"><b>اطلاعات بلیت و پرداخت</b></h2>
        <v-row>
            <v-col dir="rtl" cols="5">
                <v-card :rounded="4" variant="flat" class="d-flex flex-column justify-content-start ml-10  ms-2 mt-10">
                    <v-card-title class="font-weight-bold mt-5" dir="rtl">جزئیات پرداخت</v-card-title>
                    <v-card-text class="d-flex flex-row justify-space-between mt-8">
                        <p>بلیت به ارزش 60,000 تومان</p>
                        <p>2 عدد</p>
                        <p>120,000 تومان</p>
                    </v-card-text>
                    <v-card-text class="d-flex flex-row justify-space-between">
                        <p class="ms-0">کارمزد خرید آنلاین</p>
                        <p class="ms-7">4%</p>
                        <p class="ms-7">4,800 تومان</p>
                    </v-card-text>
                    <hr class="ms-3 me-3 mt-3" style="color: beige;">
                    <v-card-text class="d-flex flex-row justify-space-between">
                        <p class="ms-0">مبلغ قابل پرداخت</p>
                        <p class="ms-7">124,800 تومان</p>
                    </v-card-text>
                </v-card>
                <v-card variant="flat" class="mt-7 ml-10  ms-2">
                    <v-card-text class="d-flex flex-row justify-space-between">
                        <div class="d-flex flex-row mt-3 me-3 rounded-pill border-white">
                            <v-icon class="ml-2 " icon="mdi-percent"></v-icon>
                            کد تخفیف دارید؟
                        </div>
                    </v-card-text>
                </v-card>
                <div class="d-flex flex-row">
                    <v-card variant="flat" class="mt-7 ml-10  ms-2 d-flex flex-row">
                        <v-checkbox  v-model="checkbox1" color="success" class="mr-5"></v-checkbox>
                        <v-card-text>درگاه ملت</v-card-text>
                    </v-card>

                    <v-card variant="flat" class="mt-7 ml-10  ms-2 d-flex flex-row">
                        <v-checkbox  v-model="checkbox2"  color="success" class="mr-5"></v-checkbox>
                        <v-card-text>درگاه سامان</v-card-text>
                    </v-card>

                </div>
            </v-col>
            <v-col dir="rtl">
                <v-card :rounded="4" variant="flat" class="d-flex flex-row justify-content-end align-center ms-10 mt-10">
                    <v-row class="flex-lg-row flex-s-column justify-content-start">
                        <v-col cols="3">
                            <v-responsive :aspect-ratio="16 / 9">
                                <v-img :rounded="4"
                                    style="max-height: 250px;max-width: 180px; min-height: 100px; min-width: 100px;"
                                    class="mt-5 mb-5 ml-0 ms-5" src='@/assets/images/hotel.jpeg'></v-img>
                            </v-responsive>
                        </v-col>
                        <v-col>
                            <div style="max-width: 100%;" class="d-flex flex-column mr-0 mt-5">
                                <v-card-title class="text-h6 font-weight-bold" dir="rtl">هتل</v-card-title>
                                <v-card-text dir="rtl">
                                    <div class="d-flex flex-column mt-3 ">
                                        <div class="d-flex flex-row mt-3 me-3 rounded-pill border-white">
                                            <v-icon class="me-1 " icon="mdi-crosshairs-gps"></v-icon>
                                            پردیس سینمایی کورش
                                        </div>
                                        <div class="d-flex flex-row border-white mt-5">
                                            <v-icon icon="mdi-clock"></v-icon>
                                            <div class="ms-1">
                                                سانس 23:45
                                            </div>
                                            <div class="d-flex flex-row border-white">
                                                <v-icon class="ms-5" icon="mdi-clock"></v-icon>
                                                <div class="ms-1">
                                                    پنج شنبه 30 آذر
                                                </div>
                                            </div>

                                        </div>


                                    </div>

                                </v-card-text>
                            </div>
                        </v-col>
                    </v-row>


                </v-card>
                <v-card variant="flat" :rounded="4" class="mt-7 ml-10 ms-10">
                    <v-card-title>قوانین خرید بلیت</v-card-title>
                    <v-card-text>تا ۲ ساعت قبل از شروع سانس و در صورتی که بلیت را در محل سینما چاپ نکرده باشید، می‌توانید
                        بلیت خود را بدون کسر وجه لغو کنید. مبلغ آن به حساب کاربری شما در سینماتیکت واریز خواهد
                        شد.</v-card-text>
                    <v-card-text>کاربر موظف است اطلاعات شخصی واقعی و صحیح خود را در سایت وارد نماید. سایت سینماتیکت مسئولیتی
                        در قبال هرگونه مشکل احتمالی که در اثر ارائه اطلاعات غلط از طرف کاربر به این سایت، ایجاد شده است،
                        ندارد.</v-card-text>

                </v-card>
            </v-col>

        </v-row>
    </div>
</template>


<script lang="js">
import image1 from '@/assets/images/hotel.jpeg'

export default {

    data () {
      return {
        checkbox1: true,
        checkbox2: false,
      }
    },
    setUp() {
        const info = {
            image: image1,
            caption: 'هتل',

        }


        return { info, image1 }
    }
}
</script>