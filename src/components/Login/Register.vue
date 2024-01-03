<template  style="background-color:rgb(241, 239, 239)">
    <div style="background-color: rgb(241, 239, 239);height: 100%;"
        class="d-flex flex-column justify-content-center align-center">
        <div class="d-flex flex-row">
            <h2 style="margin-top: 5rem;" append-icon="mdi-film" class="h-2 mb-2 pa-2 display-2 font-weight-bold">سینماتیکت
            </h2>
            <v-icon color="red" class="mb-2 pa-2" style="margin-top: 6rem;" icon="mdi-film"></v-icon>

        </div>


        <v-col xs="12">

            <v-card dir="rtl" class="mx-auto mt-5" rounded="lg" max-width="700" min-height="300">
                <h2 style="margin-top: 2rem;font-weight:bolder;" class="mb-5 mr-5 display-2">ایجاد حساب کاربری</h2>

                <div style="margin-top: 2rem;" dir="rtl" class="d-flex flex-column mr-5">
                    <p class="mr-4">شماره موبایل خود را وارد کنید.</p>
                    <v-form dir="rtl" class="d-flex flex-row justify-space-between mt-5">
                        <v-text-field v-model="number" class="ml-0 mb-3" dir="rtl" rounded="lg"
                            label="شماره موبایل"></v-text-field>

                        <v-btn @click="goToVerify" variant="elevated" rounded="lg" color="red" type="submit"
                            class="mt-3 ml-8" text="ادامه"></v-btn>
                    </v-form>
                </div>

            </v-card>
        </v-col>

    </div>
</template>

<style>
#phoneInput {
    width: 10px;
}

.v-input--horizontal {
    grid-template-areas: none;
    grid-template-columns: none;
    grid-template-rows: none;


}
</style>

<script lang="js">
import { useRouter } from 'vue-router';
import { ref } from 'vue'
export default {
    setup() {
        const router = useRouter();
        const number = ref('')

        const goToVerify = (event) => {
            event.preventDefault();
            console.log(number)
            if (number.value) {
                console.log(number.value)
                fetch('http://localhost:8080/api/signup', {
                    method: 'POST',
                    body: JSON.stringify({ PhoneNumber: number.value }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error number sign up');
                        }
                        console.log(response)
                        return response.json(); // Parse the response as JSON
                    })
                    .then(data => {
                        console.log(data)
                        const uid = data.uuid; // Get the uid from the response
                        console.log('UID:', uid);
                        router.push({ name: 'VerifySignUp', params: { uuid: uid } });
                    })
                    .catch(error => {
                        console.error('Error sign up :', error);
                    });
            } else {
                errorMessage.value = 'شماره تلفن خود را وارد کنید.';
                window.alert(errorMessage.value);
            }
        };
        return { goToVerify, number }


    }

}

</script>