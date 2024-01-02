<template>
  <div id="app">
    <div style="background-color: rgb(241, 239, 239);" class="d-flex flex-column justify-content-center align-center">
      <div class="d-flex flex-row">
        <h2 style="margin-top: 5rem;" append-icon="mdi-film" class="h-2 mb-2 pa-2 display-2 font-weight-bold">سینماتیکت
        </h2>
        <v-icon color="red" class="mb-2 pa-2" style="margin-top: 6rem;" icon="mdi-film"></v-icon>
      </div>

      <v-col xs="12">
        <v-card dir="rtl" class="mx-auto mt-5" rounded="lg" max-width="700" min-height="200">
          <div style="margin-top: 2rem;" dir="rtl" class="d-flex flex-column mr-5">
            <p class="mr-4">کد وارد شده را وارد کنید</p>
            <v-form dir="rtl" class="d-flex flex-row justify-space-between mt-5">
              <div id="form_area" class="d-flex flex-row justify-content-start mb-3">

                <input v-model="otp" id="text_box" class="ml-0 mb-3" placeholder="کد تایید" min-width="100px">
                <p class="box-p" v-if="seconds > 0">{{ seconds }}</p>
                <button class="box" v-if="seconds <= 0" @click="restartTimer">ارسال مجدد</button>
              </div>
              <v-btn @click="goToHome" min-width="100px" variant="elevated" rounded="lg" color="red" type="submit"
                class="mt-3 ml-8 mr-3" text="ادامه"></v-btn>
            </v-form>
          </div>
          <!-- <p dir="rtl" class="text-red mr-3 mb-3" v-if="errorMessage">{{ errorMessage }}</p> -->
        </v-card>
      </v-col>
    </div>
  </div>
</template>

<style>
#app {
  background-color: rgb(241, 239, 239);
  height: 100%;
}

#text_box {
  width: 100%;
  height: 50px;
  padding: 1rem 1rem 1rem 1rem;
  margin-left: 1rem;
  border-radius: 3px;
  border: 1px solid grey;
  background-color: whitesmoke;
  margin-left: 1rem;
}

.box {
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  border-radius: 5px;
  height: 50px;
  width: fit-content;
  margin-left: 1rem;
  border: 1px solid grey;
  background-color: whitesmoke;
}

.box-p {
  padding: 1rem 1rem 1rem 1rem;
  border-radius: 5px;
  height: 50px;
  width: fit-content;
  border: 1px solid grey;
  background-color: whitesmoke;
}

.v-input--horizontal {
  grid-template-areas: none;
  grid-template-columns: none;
  grid-template-rows: none;
}

@media (max-width: 435px) {
  .form_area {
    display: flex;
    flex-direction: column;
  }
}
</style>

<script>
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted, onBeforeUnmount } from 'vue';


export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const receivedData = ref('');
    const data = ref('');
    const errorMessage = ref('');
    const otp = ref()

    onMounted(() => {
      receivedData.value = route.params.uid;
    });

    const goToHome = () => {
      if (otp.value) {
        fetch('http://185.128.40.150:8080/api/verify_login', {
          method: 'POST',
          body: JSON.stringify({ OTP: otp.value }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Error submitting comment');
            }
            return response.json(); // Parse the response as JSON
          })
          .then(text => {
            console.log('Response:', text); // Log the response text
            const data = JSON.parse(text); // Try parsing the response as JSON
            console.log(' verified aand response : '+data);
            router.push({ name: 'Home' });
          })
          .catch(error => {
            console.error('Error submitting comment:', error);
          });
      } else {
        errorMessage.value = 'شماره تلفن خود را وارد کنید.';
        window.alert(errorMessage.value);
      }

    };

    const seconds = ref(59);
    let intervalId;

    const updateNumber = () => {
      seconds.value -= 1;
      if (seconds.value === 59) {
        clearInterval(intervalId);
        startTimer();
      }
    };

    const startTimer = () => {
      intervalId = setInterval(updateNumber, 1000);
    };

    const restartTimer = () => {
      clearInterval(intervalId);
      startTimer();
    };

    onMounted(startTimer);

    onBeforeUnmount(() => {
      clearInterval(intervalId);
    });

    return { seconds, restartTimer, goToHome, receivedData, data, errorMessage };
  },
};
</script>
