<template  style="background-color:rgb(241, 239, 239)">
    <div style="background-color: rgb(241, 239, 239);height: 100%;" class="d-flex flex-column justify-content-center align-center">
        <div class="d-flex flex-row">
            <h2 style="margin-top: 5rem;" append-icon="mdi-film" class="h-2 mb-2 pa-2 display-2 font-weight-bold">سینماتیکت</h2>
            <v-icon color="red" class="mb-2 pa-2" style="margin-top: 6rem;" icon="mdi-film"></v-icon>
            
        </div>
       

        <div class="d-flex flex-row justify-space-between">
            <v-btn style="margin-left: 610px;" color="white">بازگشت</v-btn>
        </div>
            <v-card class="mx-auto mt-5" rounded="lg" width="700" height="300" >
                <div class="d-flex flex-row justify-space-between mt-5 mb-5">
                    <v-btn variant="elevated" color="red" class="ml-4 mt-5" rounded="lg" >ایجاد حساب کاربری </v-btn>

                    <p class="font-weight-bold mr-4 mt-5 display-2">.اگر در سینماتیکت حساب کاربری ندارید، ثبت نام کنید</p>
                </div>
                <br><br>
                <div dir="rtl" class="d-flex flex-column mt-5 mr-4">
                    <p>اگر در سینماتیکت حساب کاربری دارید، وارد شوید.</p>
                    <v-form dir="rtl" class="d-flex flex-row justify-space-between mt-5">
                        <v-text-field class="mr-5" id="phoneInput" dir="rtl" rounded="lg" label="شماره موبایل" ></v-text-field>

                        <v-btn variant="elevated" rounded="lg" color="grey" type="submit" class="mt-2 ml-5" text="ورود"></v-btn>
                    </v-form>
                </div>
          
  </v-card>
       

        
        

    </div>
</template>

<style>
    #phoneInput{
        width: 60px;
    }

    .v-input--horizontal {
    grid-template-areas:none;
    grid-template-columns:none;
    grid-template-rows:none;
}
</style>