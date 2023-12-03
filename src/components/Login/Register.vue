<template  style="background-color:rgb(241, 239, 239)">
    <div style="background-color: rgb(241, 239, 239);height: 100%;" class="d-flex flex-column justify-content-center align-center">
        <div class="d-flex flex-row">
            <h2 style="margin-top: 5rem;" append-icon="mdi-film" class="h-2 mb-2 pa-2 display-2 font-weight-bold">سینماتیکت</h2>
            <v-icon color="red" class="mb-2 pa-2" style="margin-top: 6rem;" icon="mdi-film"></v-icon>
            
        </div>
       

        <div class="d-flex flex-row justify-space-between">
            <v-btn style="margin-left: 610px;" color="white">بازگشت</v-btn>
        </div>
            <v-card dir="rtl" class="mx-auto mt-5" rounded="lg" width="700" height="300" >
                <h2 style="margin-top: 3rem;letter-spacing: 0;" class="mb-5 mr-4 font-weight-black">ایجاد حساب کاربری</h2>
                
                <div style="margin-top: 3rem;" dir="rtl" class="d-flex flex-column mr-4">
                    <p class="mr-4">.شماره موبایل خود را وارد کنید</p>
                    <v-form dir="rtl" class="d-flex flex-row justify-space-between mt-5">
                        <v-text-field class="mr-5" id="phoneInput" dir="rtl" rounded="lg" label="شماره موبایل" ></v-text-field>

                        <v-btn variant="elevated" rounded="lg" color="grey" type="submit" class="mt-2 p-3 ml-5" text="ادامه"></v-btn>
                    </v-form>
                </div>
          
  </v-card>
       

        
        

    </div>
</template>

<style>
    #phoneInput{
        width: 10px;
    }

    .v-input--horizontal {
    grid-template-areas:none;
    grid-template-columns:none;
    grid-template-rows:none;
}
</style>