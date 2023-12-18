<template style="background-color:rgb(241, 239, 239)">
    <div style="background-color: rgb(241, 239, 239);" class="d-flex flex-column justify-content-center align-center">
        <div class="d-flex flex-row">
            <h2 style="margin-top: 5rem;" append-icon="mdi-film" class="h-2 mb-2 pa-2 display-2 font-weight-bold">سینماتیکت</h2>
            <v-icon color="red" class="mb-2 pa-2" style="margin-top: 6rem;" icon="mdi-film"></v-icon>
            
        </div>
       

        <v-col xs="12">
        
            <v-card dir="rtl" class="mx-auto mt-5" rounded="lg" max-width="700" min-height="200">

                
                <div style="margin-top: 2rem;" dir="rtl" class="d-flex flex-column mr-5">
                        
                        <p class="mr-4">کد فرستاده شده برای {{ phoneNumber }}
را وارد کنید.</p>                    
                    <v-form dir="rtl" class="d-flex flex-row justify-space-between mt-5">
                        <div id="form_area" class="d-flex flex-row justify-content-start mb-3">
                            
                        <input id="text_box" class="ml-0 mb-3" placeholder="کد تایید" min-width="100px">
                        <p class="box-p" v-if="seconds>0">{{ seconds }}</p>
                        <button class="box" v-if="seconds <=0" @click="restartTimer">ارسال مجدد</button>
                        
                        </div>
                        
                        <v-btn @click="goToHome" min-width="100px" variant="elevated" rounded="lg" color="red" type="submit" class="mt-3 ml-8 mr-3" text="ادامه"></v-btn>
                    </v-form>
                </div>
          
            </v-card>
        </v-col>
        
        </div>
</template>

<style>
    #text_box{
        width: 100%;
        height: 50px;
        padding: 1rem 1rem 1rem 1rem;
        margin-left: 1rem;
        border-radius: 3px;
        border: 1px solid grey;
        background-color: whitesmoke;
        margin-left: 1rem;
    }

    .box{

        padding-right: .5rem;
        padding-left: .5rem;
        border-radius: 5px;
        height: 50px;
        width: fit-content;
        margin-left: 1rem;
        border: 1px solid grey;
        background-color: whitesmoke;
    }

    .box-p{
        padding: 1rem 1rem 1rem 1rem;
        border-radius: 5px;
        height: 50px;
        width: fit-content;

        border: 1px solid grey;
        background-color: whitesmoke;
    }

    .v-input--horizontal {
    grid-template-areas:none;
    grid-template-columns:none;
    grid-template-rows:none;


}

@media(max-width:435px){
    .form_area{
        display: flex;
        flex-direction: column;
    }
}
</style>

<script lang="js">
import { useRouter } from 'vue-router';
import { ref, onMounted,onBeforeUnmount } from 'vue';    
export default{
        setup(){
            const router = useRouter();

            const goToHome= () => {
            router.push({ name: 'Home' });
             };
            const phoneNumber = '09334399089'
            const seconds = ref(59);
            let intervalId;

            const updateNumber = () => {
            // Update the number (add 1 in this example)
            seconds.value -= 1;
            if (seconds.value === 59) {
        clearInterval(intervalId); // Clear the existing interval
        startTimer(); // Start a new interval
      }
            };

            const startTimer = () => {
      // Set up an interval to update the number every second
      intervalId = setInterval(updateNumber, 1000);
    };

    const restartTimer = () => {
      // Clear the existing interval and start a new one
      clearInterval(intervalId);
      startTimer();
    };

    onMounted(startTimer);

    onBeforeUnmount(() => {
      // Clear the interval when the component is destroyed to prevent memory leaks
      clearInterval(intervalId);
    });

            return{phoneNumber,seconds,restartTimer,goToHome}
        }
    }


</script>