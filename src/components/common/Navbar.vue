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
      <!-- <div v-if="isLoggedIn" >
        <v-btn @click="goToTickets" append-icon="mdi-ticket" variant="text">بلیت های من<template v-slot:append>
          <v-icon color="#616161" style="margin-top: 4px;"></v-icon>
        </template></v-btn>
      </div> -->

    </div>
    <div class="d-flex flex-row ma-2 pa-2">
      <v-text-field v-model="searchQuery" class="kooft" dir="rtl" placeholder="جستجو فیلم، سینما و ..." :loading="loading"
        density="compact" variant="solo" prepend-inner-icon="mdi-magnify" single-line hide-details
        @click="fetchSearchResults"></v-text-field>
      <v-dialog min-width="200px" max-width="700px" v-model="dialogVisible">
        <v-card>
          <v-card-title dir="rtl">نتایج جستجو</v-card-title>
          <v-card-text>
            <v-list dense dir="rtl">
              <v-list-item dir="rtl" @click="goToFilmDetails(film)" v-for="film in movies" style="display: inline-block;"
                class="item">
                <v-list-item-avatar>
                  <v-img :src="getSrcFilm(film.id)" :alt="film.name" width="200px" height="auto"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title style="color: black;">{{ film.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item dir="rtl" @click="goToCinemaDetails(cinema)" v-for="cinema in cinemas"
                style="display: inline-block;" class="item">
                <v-list-item-avatar>
                  <v-img :src="getSrcCinema(cinema.id)" :alt="cinema.name" width="200px" height="auto"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title style="color: black;">{{ cinema.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="close()">بستن</v-btn>
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
    <v-list dir="rtl">
      <v-list-item @click="goToCinemaList">
        سینما
      </v-list-item>
      <v-list-item v-if="!isLoggedIn" @click="goToLogin">
        ورود یا ثبت نام
      </v-list-item>
      <div v-if="isLoggedIn" @click="goToProfile" class="d-flex flex-row ma-2" id="prof">
        <p class="mr-2">پروفایل</p>
      </div>
      <!-- <div v-if="isLoggedIn" @click="goToTickets" class="d-flex flex-row ma-2 mt-4" id="prof">
        <p class="mr-2">بلیت های من</p>
      </div> -->
      <v-list-item>
        <v-text-field v-model="searchQuery" dir="rtl" placeholder="جستجو فیلم، سینما " :loading="loading"
          density="compact" variant="solo" prepend-inner-icon="mdi-magnify" single-line hide-details
          @click="fetchSearchResults"></v-text-field></v-list-item>
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
  width: 400px;
  height: 40px;
  margin: auto;
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
    const cinema = ref({});
    let movies = [];
    let cinemas = [];
    let allMovies = [];
    let allCinemas = [];
    let i = 0;
    let w = 0;

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

    const close = () => {
      dialogVisible.value = false;
      movies.splice(0, movies.length);
      cinemas.splice(0, cinemas.length);
      allMovies.splice(0, allMovies.length);
      allCinemas.splice(0, allCinemas.length);
    }

    const getSrcFilm = (id) => {
      const baseUrl = "/";
      const src = `${baseUrl}assets/images/${id}.jpeg`;
      return src;
    }

    const getSrcCinema = (id) => {
      const baseUrl = "/";
      const src = `${baseUrl}assets/cinema1/${id}.jpeg`;
      return src;
    }

    const goToCinemaDetails = (cinema) => {
      router.push({ name: 'Details', params: { id: cinema.id } });
    };

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
    const consentPropertyName = 'Set-Cookie';
    const getCookie = () => storageType.getItem(consentPropertyName);

    onMounted(() => {
      isLoggedIn.value = getCookie()
      console.log(isLoggedIn.value)
    })
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`https://nramezon.shop/api/movie/search/${searchQuery.value}`);
        const data = await response.json();
        allMovies = data.movies;
        allCinemas = data.cinemas;
        if (allMovies != null) {
          allMovies.forEach(element => {
            if (element != null && element != undefined) {
              movie = element;
              movies[i] = movie;
              i = i + 1;
            }
          });
        }
        if (allCinemas != null) {

          allCinemas.forEach(element => {
            if (element != null && element != undefined) {
              cinemas[w] = element;
              w = w + 1;
            }
          });
        }
        dialogVisible.value = true;
        searchResults.value = data.response;
        searchQuery.value = '';

        i = 0;
        w = 0;
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };
    const goToTickets = () => {
      router.push('/dashboard/tickets');
    }

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
      getSrcFilm,
      goToFilmDetails,
      goToProfile,
      isLoggedIn,
      cinemas,
      getSrcCinema,
      goToCinemaDetails,
      close,
      goToTickets
    };
  },
};

</script>
