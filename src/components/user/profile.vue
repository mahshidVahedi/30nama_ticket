<template>
  <v-container id="container">
    <v-card>
      <v-card-title>اطلاعات کاربری</v-card-title>
      <v-card-text>
        <v-container>
          <v-row v-if="!isEditing" dir="rtl">
            <v-col cols="12" sm="6">
              <div class="info">شماره تلفن: {{ userData.user_phone }}</div>
            </v-col>
            <v-col cols="12" sm="6">
              <div class="info">نام: {{ userData.user_name }}</div>
            </v-col>
            <v-col cols="12" sm="6">
              <div class="info">ایمیل : {{ userData.user_email}}</div>
            </v-col>
          </v-row>
          <v-row v-else dir="rtl">
            <v-col cols="12" sm="6">
              نام
              <v-text-field v-model="updatedUser.user_name"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              ایمیل
              <v-text-field v-model="updatedUser.user_email " dir="rtl "></v-text-field>
            </v-col>

          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions class="float-left pa-2">
        <v-btn color="red" v-if="!isEditing" @click="isEditing = true">ویرایش</v-btn>
        <v-btn color="red" v-else @click="saveChanges">ذخیره</v-btn>
      </v-card-actions>

    </v-card>
    <v-btn @click="logOut" color="red" class="mt-6 float-left d-block">خروج از حساب کاربری</v-btn>
  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';


export default {
  name: 'UserInformation',
  props: {
    userId: {
      type: String,
      required: true
    },

  },
  setup(props) {
    const isEditing = ref(false);
    const userData = ref({});
    const updatedUser = ref({});
    const userName = ref('')

    const getUserData = async () => {
      try {
        const response = await fetch('https://spweird.fun/api/dashboard/profile', {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        userData.value = data;
        updatedUser.value = data
      } catch (error) {
        console.error(error);
      }

    };

    onMounted(getUserData);

    const cookieStorage = {

      getItem: (item) => {
        const cookies = document.cookie
          .split(';')
          .map(cookie => cookie.split('='))
          .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});
        return cookies[item];
      },
      setItem: (item, value) => {
        document.cookie = `${item}=${value};`;
      },

      removeItem: (item) => {
        document.cookie = `${item}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    }

    const router = useRouter();
    const storageType = cookieStorage;
    const consentPropertyName = 'Set-Cookie';
    const deleteFromStorage = () => storageType.removeItem(consentPropertyName);

    const logOut = () => {
      deleteFromStorage(storageType);
      router.push({name:'Home'});

    }

    const saveChanges = async () => {
      try {
        const response = await fetch('https://spweird.fun/api/dashboard/update/profile', {
          method: 'POST',
          body: JSON.stringify(updatedUser.value),
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        if (!response.ok) {
          throw new Error('Failed to update user information');
        }
        isEditing.value = false;
      } catch (error) {
        console.error(error);
      }
    };


    return {
      isEditing,
      userData,
      updatedUser,
      saveChanges,
      userName,
      logOut,
    };
  }
}
</script>

<style>
#container {
  direction: rtl;
}
</style>
