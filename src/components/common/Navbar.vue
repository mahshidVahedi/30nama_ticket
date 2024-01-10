<template>
  <div id="nav" dark color="white darken-1" class="ma-1 dense fixed d-none d-md-flex flex-row justify-space-between">
    <div class="d-flex flex-row ma-2 pa-2">
      <v-btn v-if="!isLoggedIn" @click="goToLogin" color="black" variant="text" append-icon="mdi-account"
        class="pa-2 ma-2 no-border">
        <template v-slot:append>
          <v-icon color="#616161"></v-icon>
        </template>
        ورود یا ثبت نام</v-btn>
      <div v-if="isLoggedIn" @click="goToProfile" class="d-flex flex-row ma-2" id="prof">
        <p class="mr-2">پروفایل</p>
        <v-avatar color="grey" size="x-small">
          <v-icon icon="mdi-account-circle" color="white"></v-icon>
        </v-avatar>
      </div>

    </div>
    <div class="d-flex flex-row ma-2 pa-2">
      <v-text-field v-model="searchQuery" class="kooft" dir="rtl" placeholder="جستجو فیلم، کارگردان و ..."
        :loading="loading" density="compact" variant="solo" prepend-inner-icon="mdi-magnify" single-line hide-details
        @click="fetchSearchResults"></v-text-field>
      <v-dialog style="width: 60%; height: 600px;" v-model="dialogVisible">
        <v-card>
          <v-card-title dir="rtl">نتایج جستجو</v-card-title>
          <v-card-text>
            <v-list dense>
              <v-list-item dir="rtl" @click="goToFilmDetails(film)" v-for="film in movies" :key="film.id"
                style="display: inline-block;" class="item">
                <v-list-item-avatar>
                  <v-img :src="getSrc(film.id)" :alt="film.name" width="200px" height="auto"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title style="color: black;">{{ film.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="dialogVisible = false">بستن</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
      <v-list-item @click="goToCinemaList">
        سینما
      </v-list-item>
      <v-list-item @click="goToLogin">
        ورود یا ثبت نام
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
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

.kooft {
  width: 300px;
}

#prof:hover {
  cursor: pointer;
}
</style>

<script>

import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';


export default {
  setup() {
    const router = useRouter();
    const drawer = ref(false);
    const dialogVisible = ref(false);
    const searchQuery = ref('');
    const searchResults = ref({});
    let movie = ref({});
    let movies = [];
    let allMovies = [];
    let i = 0;
    // const name= '';
    //const name = ref('');

    const goToHome = () => {
      router.push('/');
    };

    const goToCinemaList = () => {
      router.push('/cinema-list');
    };

    const goToLogin = () => {
      router.push('/login');
    };

    const goToFilmDetails = (film) => {
      router.push({ name: 'Film', params: { id: film.id } });
    };

    const goToProfile = () => {
      router.push({ name: 'dashboard' });
    }

    const getSrc = (id) => {
      const src = `/src/assets/images/${id}.jpeg`
      return src;
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
      }
    }
    const isLoggedIn = ref(false)

    const storageType = cookieStorage;
    const consentPropertyName = 'token';
    const getCookie = () => storageType.getItem(consentPropertyName);

    onMounted(() => {
      isLoggedIn.value = getCookie()
      console.log(isLoggedIn.value)
    })

    const fetchSearchResults = async () => {
      console.log(searchQuery.value);
      try {
        const response = await fetch(`http://185.128.40.150:8080/api/movie/search/${searchQuery.value}`);
        const data = await response.json();
        console.log(allMovies);
        console.log(movies);
        allMovies = data.movies;
        const allDirectors = data.directorMovies;
        const cinemas = data.cinemas;
        allMovies.forEach(element => {
          if (element != null && element != undefined) {
            // console.log(movies);
            movie = element;
            // console.log(movie);
            // if (movie !== '') {
            movies[i] = movie;
            // }
            //console.log(movies[i]);
            i = i + 1;
          }
        });
        const f = data.movies[0];
        dialogVisible.value = true;
        searchResults.value = data.response;
        // movies.value = data.movies;
        // movie.value = f.name;
        // console.log(movie);
        searchQuery.value = '';
        allMovies.splice(0, allMovies.length);
        // movies.length=0;
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    return {
      drawer,
      movies,
      dialogVisible,
      searchQuery,
      searchResults,
      goToHome,
      goToCinemaList,
      goToLogin,
      fetchSearchResults,
      movies,
      getSrc,
      goToFilmDetails,
      goToProfile,
      isLoggedIn
    };
  },
};

</script>
