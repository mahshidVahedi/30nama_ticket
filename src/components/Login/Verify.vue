<template  style="background-color:rgb(241, 239, 239)">
    <div style="background-color: rgb(241, 239, 239);height: 100%;" class="d-flex flex-column justify-content-center align-center">
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
                        <div class="d-flex flex-row">
                            <!-- <div min-width="100px" >{{ seconds }}</div> -->
                            
                        </div>
                        
                        <v-text-field class="ml-0 mb-3" dir="rtl" rounded="lg" label="کد تایید" ></v-text-field>
                        <v-btn min-width="100px" variant="elevated" rounded="lg" color="red" type="submit" class="mt-3 ml-8" text="ادامه"></v-btn>
                    </v-form>
                </div>
          
            </v-card>
        </v-col>
        
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

<script lang="js">
    export default{
        setup(){
            const phoneNumber = '09334399089'
            const seconds=59
            const interval = -1

            const timer = ()=>{
                if(this.seconds<0){
                    this.seconds=0
                }else{
                    this.seconds=this.seconds-1;
                }
                
            }

            

            return{phoneNumber,timer,seconds}
        }
    }
</script>