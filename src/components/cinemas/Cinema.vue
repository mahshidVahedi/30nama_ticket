<template>
    <!-- <Navbar></Navbar> -->
    

    <v-img :src="cinema.mainPhoto" class="align-center ma-0 pa-0"
        gradient="to top, rgba(1,1,0,.6), rgba(0,0,0,.7)" cover>
        <v-row cl dir="rtl">
          <v-col cols="9">
            <div class="d-flex flex-row justify-center align-center">
              <v-img rounded="4" style="max-height: 300px" :src="cinema.mainPhoto"></v-img>
              <v-card dir="rtl" variant="text" height="100%" width="40%" class="mx-auto align-center text-white g-0 ms-0">
                <v-card-title class="text-h6 font-weight-bold mb-5" dir="rtl">{{ cinema.name }}</v-card-title>
                <v-card-text dir="rtl">
                  <div class="mt-3 mb-3">
                   {{ cinema.location}}
                  </div>
                  <div class="d-flex flex-row mt-3 ">
                    
                    <div color="red" class="d-flex flex-row border-white mt-3 me-3">
                      <v-icon class="ms-5" color="red" icon="mdi-heart"></v-icon>
                      <div class="text-red ms-1">
                        {{ cinema.score }}
                      </div>
                    </div >

                    <div v-for="(facility, i) in facilities" :key="i">
                            <v-icon color='white' icon={{ facility.name }}></v-icon>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>
        <div class="ml-8 mr-8 mt-8" rounded="5" style="background-color: white;">
            <h2 class="font-weight-bold mt-8 mr-3 text-black" dir="rtl"> برنامه اکران  {{ cinema.name }}</h2>
            <div class="mt-8" v-for="(film, i) in films" :key="i">
                <v-row dir="rtl">
          <v-col  cols="9">
            <div class="d-flex flex-row justify-center align-center">
              <v-img class="rounded-4" style="max-height: 300px" :src="film.photo"></v-img>
              <v-card dir="rtl" variant="text" height="100%" width="40%" class="mx-auto align-center text-black g-0 ms-0">
                <v-card-title class="text-h6 font-weight-bold mb-5" dir="rtl">{{ film.title }}</v-card-title>
                <v-card-text dir="rtl">
                  <div class="mt-3 mb-3">
                    کارگردان : {{ film.director }}
                  </div>
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
                
              </v-card>
            </div>
          </v-col>
        </v-row>
            </div>

        </div>
      </v-img>

    <!-- <Footer></Footer> -->
</template>

<script lang="js">
import Navbar from '../common/Navbar.vue';
import Footer from '../common/Footer.vue';
import cinemaPhoto from '@/assets/cinema1/1.jpg'
import photoM1 from '@/assets/fosilM.jfif'
import photoM2 from '@/assets/jangal.jfif'
import photoM3 from '@/assets/gijgah.jfif'
export default{
    setup() {
        const films = [
                {
                    title: 'فسیل',
                    director: 'کریم امینی',
                    photo: photoM1,
                    score: '4.5/5',
                    duration: '85',
                    genre: 'کمدی',
                    description: "فیلم فسیل به کارگردانی کریم امینی و تهیه‌کنندگی ابراهیم عامریان است. بهرام افشاری، هادی کاظمی، الناز حبیبی، الهه حصاری، ایمان صفا، بابک کریمی، سیدجواد هاشمی و ... در این فیلم کمدی ایفای نقش کرده‌اند."
                },
                {
                    title: 'جنگل پرتقال',
                    director: ' آرمان خوانساریان',
                    photo: photoM2,
                    score: '4/5',
                    duration: '90',
                    genre: 'درام',
                    description: "فیلم جنگل پرتقال نویسندگی و کارگردانی آرمان خوانساریان و محصول سال 1401 است. سارا بهرامی، میرسعید مولویان، رضا بهبودی، رضا عموزاد، فراز سرابی، داوود فتحعلی بیگی، فرشته مرعشی، ارشیا نیک‌بین، حمیدرضا عباسی، زینب شعبانی و حسام نورانی بازیگران این فیلم هستند."
                },
                {
                    title: 'گیجگاه',
                    director: ' عادل تبریزی',
                    photo: photoM3,
                    score: '2.9/5',
                    duration: '105',
                    genre: 'عاشقانه',
                    description: "فیلم گیج‌گاه نخستین فیلم عادل تبریزی محصول سال 1399 است که در آن بازیگرانی همچون جمشید هاشم‌پور، حامد بهداد، باران کوثری، سروش صحت، فرهاد آییش ایفای نقش می‌کنند. این فیلم در سی‌و‌نهمین جنشواره‌ی فیلم فجر نیز حضور داشت و در دو بخش بهترین تدوین و بهترین کارگردان فیلم اولی، نامزد دریافت سیمرغ شد. "
                }
            ]

        const cinema = {
            mainPhoto : cinemaPhoto,
            name: 'پردیس سینمایی کورش',
            location: 'اتوبان حکیم غرب، ستاری شمال، جنب پیامبر مرکزی، مترو آریا-شهر',
            score: '3.6/5',
            facilities: [
                {
                    name:'facebook'
                }
                
            ],
            
            description: 'پردیس سینمایی کوروش، بزرگترین پردیس سینمایی کشور در طبقات4و6 مجتمع تجاری، فرهنگی و تفریحی کورش با سرمایه گذاری گروه صنعتی گلرنگ طی چهارسال ساخته شده است. 16000متر مربع از مجتمع تجاری، فرهنگی و تفریحی پردیس کورش به 12 سالن سینما اختصاص داده شده که 2800 صندلی به ظرفیت سینماهای کشور اضافه کرده است. پردیس سینمایی کورش کار خود را در ۲۷ مرداد ۱۳۹۳ با اکران فیلم سینمایی شهر موش ها 2 آغاز کرد. نام سالن های سینما کوروش به یاد سینماهای خیابان لاله زار تهران گذاشته شده اند. همچنین این سینما دارای رستورانهای گوناگون و پارکینگ نیز میباشد.',
            Comments: [
                {
                    text: 'بهترین پردیس سینمایی ،عالیییی',
                    person: 'ناشناس'
                },
                {
                    text: 'امیدوارم مثل چندسال پیش مجدد فیلم خارجی اکران کنین..واقعا فیلمهایی مثل اپنهایمر-فارست گامپ -پیانیست- ارباب حلقه ها و خیلی های دیگه که ارزش چندبار دیدن رو دارن بهتره اکران کنین',
                    person: 'مهتاب نجفی'
                }
            ]
        }

        return{cinema,films}
    }
}
</script>