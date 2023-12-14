<template>
    <!-- <Navbar></Navbar> -->
    
<v-img :src="cinema.mainPhoto" dir="rtl" class="align-center ma-0 pa-0"
        gradient="to bottom, rgba(0,0,0,.7), rgba(2,8,0,1)" cover
        max-height="300px"
        > 
        <!-- <v-row  dir="rtl" class="mr-0 ml-0">
          <v-col cols="12"> -->
            <div  dir="rtl"  class="d-flex flex-row justify-center align-center mr-0 ml-0 opacity-background">
              
              <v-card  variant="text" height="100%" width="100%" class="d-flex flex-row justify-content-start align-center text-white g-0 ms-0" cover>
                
                <v-img :src="cinema.mainPhoto" style="max-height: 200px;max-width: 400px;border-radius: 10%;box-shadow: 0 2px 2px 0 rgba(251, 250, 250, 0.2), 0 6px 2px 0 rgba(0, 0, 0, 0.19);" rounded="5" class="mt-5 mb-5"></v-img>
                <div class="mr-0">
                  <v-card-title class="text-h6 font-weight-bold mb-5" dir="rtl">{{ cinema.name }}</v-card-title>
                <v-card-text dir="rtl">
                  <div class="mt-3 mb-3">
                   {{ cinema.location}}
                  </div>
                  <div class="d-flex flex-column mt-3 ">
                    
                    <div color="red" class="d-flex flex-row border-white mt-3 me-3">
                      <v-icon class="ms-5" color="red" icon="mdi-heart"></v-icon>
                      <div class="text-red ms-1">
                        {{ cinema.score }}
                      </div>
                    </div >
                    <div class="d-flex flex-row mt-5">

                      <div v-for="(feature, i) in cinema.features" :key="i" class="mr-5 ml-5">
                    
                    <v-tooltip
        v-model="show"
        location="bottom"
      >
        <template v-slot:activator="{on, props }">
         
            <v-icon v-bind="props" v-on="on" color="grey-lighten-1">
              {{feature.icon}}
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

        <div dir="rtl" style="background-color: rgb(227, 229, 230);">
          <div class="ml-8 mr-8 mb-10" rounded="5" style="background-color: white;">
            <h2 class="mb-10 mr-3 text-black font-weight-bold">برنامه اکران  {{ cinema.name }}</h2>
            <v-card>
    <v-tabs dir="rtl"
      v-model="tab"
      color="deep-grey-accent-4"
      align-tabs="start"
    >
      <v-tab :value="1">چهارشنبه 12 آذر</v-tab>
      <v-tab :value="2">پنج شنبه 13 آذر</v-tab>
      <v-tab :value="3">جمعه 14 آذر</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item
        v-for="n in 3"
        :key="n"
        :value="n"
      >
      <div class="mt-8" v-for="(film, i) in films" :key="i">
                <v-row dir="rtl">
          <v-col  cols="9">
            <div class="d-flex flex-row justify-center align-center mr-10">
              <v-img class="rounded-4" style="max-height: 300px;max-width: 200px;" :src="film.photo"></v-img>
              <v-card dir="rtl" variant="text" height="100%" width="40%" class="mx-auto align-center text-black">
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
      </v-window-item>
    </v-window>

    
  </v-card>
           

        </div>        

        <h2 dir="rtl" class="mt-10 mb-3 mr-3 text-grey font-weight-bold">درباره {{ cinema.name }}</h2>
        <p dir="rtl" class="mr-10 ml-10 mt-10">{{ cinema.description }}</p>

        <div dir="rtl" class="ml-8 mr-8 mb-10" rounded="5" style="background-color: white; margin-bottom: 300px;">
        
          <h2 dir="rtl" class="mt-10 mb-3 mr-3 text-grey font-weight-bold">دیدگاه کاربران درباره  {{ cinema.name }}</h2>
      <div class="mt-8" v-for="(Comment, i) in cinema.Comments" :key="i">
            <v-card
  >
    <v-card-subtitle>
      {{Comment.name}}
    </v-card-subtitle>

    <v-card-text>
      {{Comment.comment }}
    </v-card-text>
  </v-card>
      </div>


        </div>
        
      </div>
       
    <!-- <Footer></Footer> -->
</template>



<script lang="js">
import Navbar from '../common/Navbar.vue';
import Footer from '../common/Footer.vue';
import cinemaPhoto from '@/assets/cinema1/1.jpg'
import photoM1 from '@/assets/fosilM.jfif'
import photoM2 from '@/assets/jangal.jfif'
import photoM3 from '@/assets/gijgah.jfif'
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiWifi } from '@mdi/js';
export default{
  data: () => ({
      tab: null,
      path: mdiWifi,
      show: false,
    }),
    
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
            features: [
                {
                    value:'کافی شاپ',
                    icon:'mdi-coffee',
                },
                {
                    value:'فود کورت',
                    icon:'mdi-food',
                },
                {
                    value:'پارکینگ',
                    icon:'mdi-parking',
                }
                
            ],
            
            description: 'پردیس سینمایی کوروش، بزرگترین پردیس سینمایی کشور در طبقات4و6 مجتمع تجاری، فرهنگی و تفریحی کورش با سرمایه گذاری گروه صنعتی گلرنگ طی چهارسال ساخته شده است. 16000متر مربع از مجتمع تجاری، فرهنگی و تفریحی پردیس کورش به 12 سالن سینما اختصاص داده شده که 2800 صندلی به ظرفیت سینماهای کشور اضافه کرده است. پردیس سینمایی کورش کار خود را در ۲۷ مرداد ۱۳۹۳ با اکران فیلم سینمایی شهر موش ها 2 آغاز کرد. نام سالن های سینما کوروش به یاد سینماهای خیابان لاله زار تهران گذاشته شده اند. همچنین این سینما دارای رستورانهای گوناگون و پارکینگ نیز میباشد.',
            Comments: [
                {
                  comment : 'بهترین پردیس سینمایی ،عالیییی',
                    name: 'ناشناس'
                },
                {
                  comment : 'امیدوارم مثل چندسال پیش مجدد فیلم خارجی اکران کنین..واقعا فیلمهایی مثل اپنهایمر-فارست گامپ -پیانیست- ارباب حلقه ها و خیلی های دیگه که ارزش چندبار دیدن رو دارن بهتره اکران کنین',
                    name: 'مهتاب نجفی'
                }
            ]
        }

        return{cinema,films}
    }
}
</script>