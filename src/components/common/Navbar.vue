<template>
  <div id="nav" dark color="white darken-1" class="ma-1 dense fixed d-none d-md-flex flex-row justify-space-between">
    <div class="d-flex flex-row ma-2 pa-2">
      <v-btn @click="goToLogin" color="black" variant="text" append-icon="mdi-account" class="pa-2 ma-2 no-border">
        <template v-slot:append>
          <v-icon color="#616161"></v-icon>
        </template>
        ورود یا ثبت نام</v-btn>
    </div>
    <div class="d-flex flex-row ma-2 pa-2">
      <v-btn append-icon="mdi-magnify" class="ma-2">
        <input dir="rtl" placeholder="جستجو فیلم، بازیگر و ..." id="" cols="20" rows="5">
      </v-btn>
      <v-btn @click="goToCinemaList" color="black" append-icon="mdi-movie" variant="text" class="ma-2 pa-2">
        <template v-slot:append>
          <v-icon color="#616161"></v-icon>
        </template>
        سینما</v-btn>
      <v-btn @click="goToHome" color="black" append-icon="mdi-film" variant="text" class="ma-2 pa-2 font-weight-bold">
        <template v-slot:append>
          <v-icon color="red"></v-icon>
        </template>
        سینما تیکت</v-btn>
    </div>
  </div>

  <v-toolbar flat app color="white" prominent dir="rtl" class="d-flex d-md-none">
    <div class="d-flex flex-row">
      <v-btn color="black" append-icon="mdi-ticket" variant="text" class="d-none d-sm-flex">
        <template v-slot:append>
          <v-icon color="#616161"></v-icon>
        </template>
        بلیط های من</v-btn>

      <v-btn @click="dialog = true" variant="text" color="black" append-icon="mdi-crosshairs-gps"
        class="d-none d-sm-flex">
        <template v-slot:append>
          <v-icon color="#616161"></v-icon>
        </template>
        مکان</v-btn>



    </div>

    <v-spacer></v-spacer>
    <div class="d-flex flex-row">
      <v-btn append-icon="mdi-magnify" class="ma-2 d-none d-sm-flex">
        <input dir="rtl" placeholder="جستجو فیلم، بازیگر و ..." id="" cols="20" rows="5">
      </v-btn>
      <v-toolbar-title><v-btn @click="goToHome" color="black" append-icon="mdi-film" variant="text"
          class="font-weight-bold">
          <template v-slot:append>
            <v-icon color="red"></v-icon>
          </template>
          سینما تیکت</v-btn></v-toolbar-title>

      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </div>



  </v-toolbar>

  <v-navigation-drawer v-model="drawer" location="top" class="d-flex d-md-none">
    <v-list>
      <!-- <v-list-item class="d-flex d-sm-none">
        بلیط های من
      </v-list-item>
      <v-list-item @click="dialog = true" class="d-flex d-sm-none">
        مکان
      </v-list-item> -->
      <v-list-item @click="goToCinemaList">
        سینما
      </v-list-item>
      <v-list-item @click="goToLogin">
        ورود یا ثبت نام
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-dialog v-model="dialog" max-width="600px">
    <v-card dir="rtl">
      <div class="d-flex flex-row mr-5  mb-5 mt-5">
        <v-icon color="#616161" icon="mdi-crosshairs-gps mt-4"></v-icon>
        <v-card-title class="text-black font-wight-bold">موقعیت مکانی</v-card-title>
      </div>


      <hr>
      <v-row class="mb-4 mt-4">
        <v-col v-for="(city, index) in cities" :key="index" cols="12" sm="6" md="4" lg="4">
          <v-card variant="text" class="mr-5" @click="dialog = false">
            <v-card-title>{{ city }}</v-card-title>
          </v-card>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-btn color="red" block @click="dialog = false" class="mt-5  font-weight-bold">بستن</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style>
@import url('https://fonts.cdnfonts.com/css/iranian-sans');
@import url('https://fonts.googleapis.com/css2?family=Cairo+Play:wght@500&family=Lexend:wght@400;600&family=Outfit&display=swap');

#nav {
  height: auto;
  margin-top: 0px;
}

#cinematicket {
  font-family: 'Cairo Play', sans-serif;
}

input {
  background: white url("assets/search-icon.svg") no-repeat 15px center;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
}
</style>

<script>
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      dialog: false,
      drawer: false,
    }
  },
  setup() {
    const router = useRouter();

    const goToHome = () => {
      router.push({ name: 'Home' });
    };

    const goToCinemaList = () => {
      router.push({ name: 'Cinemas' });
    };


    const goToLogin = () => {
      router.push({ name: 'Login' });
    };

    const cities = [
      'تهران',
      'مشهد',
      'تبریز',
      'قم',
      'اراک',
      'شیراز',
      'یزد',
      'کرمان',
      'اسفهان',
      'کرج',
      'اهواز',
      'کرمانشاه',
      'ارومیه',
      'رشت',
      'همدان',
      'اردبیل',
      'ساری',
      'سنندج'
    ]

    return {
      goToCinemaList,
      goToHome,
      goToLogin,
      cities
    };
  },
};
</script>

