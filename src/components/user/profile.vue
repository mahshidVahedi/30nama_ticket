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
              <div class="info">ایمیل: {{ userData.user_email }}</div>
            </v-col>
            <v-col cols="12" sm="6">
              <div class="info">نام : {{ userData.user_name }}</div>
            </v-col>
          </v-row>
          <v-row v-else dir="rtl">
            <v-col cols="12" sm="6">
              <v-text-field :model-value="fjdsnjkbavjs" v-model="updatedUser.email" ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field :model-value="userData.user_name" v-model="updatedUser.name"></v-text-field>
            </v-col>

          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="red" v-if="!isEditing" @click="isEditing = true" class="but">ویرایش</v-btn>
        <v-btn color="red" v-else @click="saveChanges">ذخیره</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'UserInformation',
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const isEditing = ref(false);
    const userData = ref({});
    const updatedUser = ref({});

    const getUserData = async () => {
      try {
        const response = await fetch('http://185.128.40.150:8080/api/dashboard/profile');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        userData.value = data;
        console.log(userData);
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(getUserData);

    const saveChanges = async () => {
      try {
        const response = await fetch('http://185.128.40.150:8080/api/dashboard/update/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedUser.value)
        });
        console.log(response);
        console.log(updatedUser);
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
      saveChanges
    };
  }
}
</script>

<style>
#container {
  direction: rtl;
}

.but {
  float: left;
}
</style>
