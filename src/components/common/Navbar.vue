<template>
  <div id="nav" dark color="white darken-1" class="ma-1 dense fixed d-flex flex-row justify-space-between">
    <div class="d-flex flex-row ma-2 pa-2">
      <v-btn @click="goToLogin" color="black" variant="text" append-icon="mdi-account" class="pa-2 ma-2 no-border">
        <template v-slot:append>
          <v-icon color="#616161"></v-icon>
        </template>
        ورود یا ثبت نام</v-btn>
      <v-btn color="black" append-icon="mdi-ticket" variant="text" class="pa-2 ma-2">
        <template v-slot:append>
          <v-icon color="#616161"></v-icon>
        </template>
        بلیط های من</v-btn>
      <v-btn @click="dialog = true" variant="text" color="black" append-icon="mdi-crosshairs-gps" class="pa-2 ma-2">
        <template v-slot:append>
          <v-icon color="#616161"></v-icon>
        </template>
        مکان</v-btn>
    </div>
    <div class="d-flex flex-row ma-2 pa-2">
      <v-btn append-icon="mdi-magnify" class="ma-2">
        <input dir="rtl" placeholder="جستجو فیلم، بازیگر و ..." id="" cols="20" rows="5">
      </v-btn>
      <v-btn @click="goToCinemaList" color="black" append-icon="mdi-movie" variant="text" class="ma-2 pa-2"  >
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

  <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card dir="rtl">
        <v-card-title>موقعیت مکانی</v-card-title>
        <v-list lines="one">
  <v-list-item @click="dialog = false" v-for="(city,i) in cities" :key="i" :title="city"></v-list-item> 
</v-list>
        <v-card-actions>
          <v-btn color="red" block @click="dialog = false">بستن</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<style>
@import url('https://fonts.cdnfonts.com/css/iranian-sans');
@import url('https://fonts.googleapis.com/css2?family=Cairo+Play:wght@500&family=Lexend:wght@400;600&family=Outfit&display=swap');
/* *{
  font-family: 'Iranian Sans', sans-serif;
  letter-spacing: 0rem;
} */

#nav{
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
  data () {
      return {
        dialog: false,
      }
    },
  setup() {
    const router = useRouter();

    const goToHome= () => {
      router.push({ name: 'Home' });
    };

    const goToCinemaList = () => {
      router.push({ name: 'Cinemas' });
    };


    const goToLogin= () => {
      router.push({ name: 'Login' });
    };

    const cities = [
      'تهران',
      'مشهد',
      'تبریز',
      'قم',
      'اراک'
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

