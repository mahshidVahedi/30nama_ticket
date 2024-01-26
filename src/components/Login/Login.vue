<template  style="background-color:rgb(241, 239, 239)">
  <div style="background-color: rgb(241, 239, 239);height: 100%;"
    class="d-flex flex-column justify-content-center align-center">
    <div class="d-flex flex-row">
      <h2 style="margin-top: 5rem;" append-icon="mdi-film" class="h-2 mb-2 pa-2 display-2 font-weight-bold">سینماتیکت
      </h2>
      <v-icon color="red" class="mb-2 pa-2" style="margin-top: 6rem;" icon="mdi-film"></v-icon>

    </div>
    <v-dialog v-model="show" max-width="600px">
      <v-alert closable icon="$warning" text="شماره تلفن خود را وارد کنید." type="warning" dir="rtl"></v-alert>
    </v-dialog>
    <v-dialog v-model="noAcc" max-width="600px" max-height="400px" min-width="300px">
      <v-alert prominent type="error" dir="rtl">
        <v-row align="center">
          <v-col class="grow">
            گرفتی ما رو؟؟ برو حساب باز کن
          </v-col>
          <v-col class="shrink">
            <v-btn @click="goToSign()"> ایجاد حساب کاربری</v-btn>
          </v-col>
        </v-row>
      </v-alert>
    </v-dialog>

    <v-col>

      <v-card class="mx-auto mt-5" rounded="lg" max-width="700" min-height="300">
        <div dir="rtl" class="d-flex flex-wrap justify-space-between mt-10 mb-5 mr-4 ml-2">

          <p class="mt-5">اگر در سینماتیکت حساب کاربری ندارید ثبت نام کنید.</p>
          <v-btn @click="goToRegister" variant="elevated" color="red" class="ml-4 mt-5" rounded="lg">ایجاد حساب
            کاربری </v-btn>

        </div>

        <div dir="rtl" class="d-flex flex-wrap-reverse flex-column mt-14 mr-4 ml-4">
          <p>اگر در سینماتیکت حساب کاربری دارید، وارد شوید.</p>
          <v-form dir="rtl" class="d-flex flex-row flex-wrap justify-space-between mt-5">
            <v-text-field v-model="number" @input="checkPhoneNumber" min-width="100px" class="ml-0 mb-3" dir="ltr"
              rounded="lg" placeholder="09xxxxxxxxx" append-inner-icon="mdi-cellphone"></v-text-field>

            <v-btn :disabled="!isButtonEnabled" :color="buttonColor" @click="goToVerify" min-width="50px"
              variant="elevated" rounded="lg" color="grey" type="submit" class="mt-2 ml-5" text="ورود"></v-btn>


          </v-form>
        </div>
        <!-- <p dir="rtl" class="text-red mr-3 mb-3" v-if="errorMessage">{{ errorMessage }}</p> -->
      </v-card>
    </v-col>






  </div>
</template>

<style>
#phoneInput {
  width: 60px;
}

/* .v-input--horizontal {
    grid-template-areas:none;
    grid-template-columns:none;
    grid-template-rows:none; */
/* } */
</style>

<script lan="js">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
export default {
  setup() {
    const router = useRouter();
    const number = ref('');
    const errorMessage = ref('');
    const uid = ref();
    const show = ref(false);
    const noAcc = ref(false);
    const isButtonEnabled = ref(false);
    const buttonColor = ref('grey');

    const checkPhoneNumber = () => {
      if (number.value.length === 11) {
        isButtonEnabled.value = true;
        buttonColor.value = 'red';
      } else {
        isButtonEnabled.value = false;
        buttonColor.value = 'grey';
      }
    };

    const goToRegister = () => {
      router.push({ name: 'Register' });
    };

    const goToVerify = (event) => {
      event.preventDefault();
      if (number.value) {
        fetch('https://nramezon.shop/api/login', {
          method: 'POST',
          body: JSON.stringify({ PhoneNumber: number.value }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            if (!response.ok) {
              showError();
              throw new Error();
            }
            return response.json(); // Parse the response as JSON
          })
          .then(data => {
            console.log('otp:' + data.otp)
            const uid = data.uuid; // Get the uid from the response
            router.push({ name: 'VerifyLogin', params: { uuid: uid } });
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        // errorMessage.value = 'شماره تلفن خود را وارد کنید.';
        // window.alert(errorMessage.value);
        show.value = true;
      }
    };
    const showError = () => {
      noAcc.value = true;
    }
    const goToSign = () => {
      router.push('/register');
      noAcc.value = false;
    }

    return { goToRegister, goToVerify, number, errorMessage, show, showError, goToSign, noAcc, checkPhoneNumber,isButtonEnabled,buttonColor }
  }
}

</script>
