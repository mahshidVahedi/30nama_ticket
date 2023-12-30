<template id="page">
  <div id="container">
    <v-container>
      <div class="scene">
        صحنه نمایش
      </div>
      <div id="salon">
        <v-row v-for="row in 8" :key="row" class="seat-row">
          <v-col v-for="seat in 9" :key="seat" class="seat-column">
            <v-icon
              icon="mdi-seat"
              @click="toggleSeat(row, seat)"
              :class="{
                'mdi-seat': isSelectedSeat(row, seat),
                'mdi-seat-occupied': !isSelectedSeat(row, seat)
              }"
            ></v-icon>
          </v-col>
        </v-row>
      </div>
    </v-container>
    <div dir="rtl" class="ma-8">
      <p>
        <v-icon>mdi-movie</v-icon>
        {{ info.filmName }}
      </p>
      <p>
        <v-icon>mdi-map-marker</v-icon>
        {{ info.cinema }}
      </p>
      <p class="mt-3 mb-3 mr-0">
        <v-icon style="min-width: none;" icon="mdi-clock"></v-icon>
        {{ info.scene.minute }} : {{ info.scene.hour }}
      </p>
    </div>
  </div>
</template>

<style>
#page{

}
#container {
  width: 80%;
  margin: auto;
  margin-top: 5%;
}

.v-icon.mdi-seat {
  color: green;
  font-size: 24px;
}

.v-icon.mdi-seat-occupied {
  color: rgb(84, 66, 66);
  font-size: 24px;
}

.scene {
  width: 90%;
  height: 40px;
  background-color: #807e7e;
  margin: auto;
  border-radius: 10px;
  text-align: center;
  padding-top: 8px;
}

#salon {
  width: 80%;
  margin: auto;
  margin-top: 10%;
  display: flex;
  flex-wrap: wrap;
}

.seat-row {
  justify-content: center;
}

.seat-column {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 11.11%;
  max-width: 11.11%;
  padding: 4px;
}
@media (min-width: 850px) {
  #container {
    width: 80%;
    height: 480px;
  }

  .scene{
    width: 50%;
  }
  #salon{
    width:60% ;
  }
}
@media (min-width: 1250px) {
  #container {
    width: 80%;
    height: 640px;
  }

  #salon{
    width:50% ;
  }
}
@media (min-width: 1350px) {
  #container {
    width: 80%;
    height: 640px;
  }

  #salon{
    width:40% ;
  }
  .scene{
    width: 41%;
  }
}
</style>
<script>
import { mdiWifi } from '@mdi/js';
import { ref, onMounted, computed } from 'vue';
import router from '@/router';
export default {
  data: () => ({
    tab: null,
    path: mdiWifi,
  }),
  setup() {

    const selectedSeats = ref([]);
    const gotoSeat = () => {
      router.push('seatSelect')
    };

    const toggleSeat = (row, seat) => {
      const seatId = `${row}-${seat}`;
      if (isSelectedSeat(row, seat)) {
        selectedSeats.value = selectedSeats.value.filter(s => s !== seatId);
      } else {
        selectedSeats.value.push(seatId);
      }
    };

    const isSelectedSeat = (row, seat) => {
      const seatId = `${row}-${seat}`;
      return selectedSeats.value.includes(seatId);
    };

    const saveAndCloseDialog = () => {
      showDialog.value = false;
      router.push({ name: 'Payment' })
    };

    const canSave = computed(() => {
      return selectedSeats.value.length > 0;
    });
    const info = ref({
      filmName: 'هتل',
      number: 3,
      cinema: 'پردیس سینمای کورش',
      selectedDate: {
        day: 30,
        month: 'دی'
      },
      scene: {
        hour: 23,
        minute: 50,
        saloonId: 4
      }
    })
    return { selectedSeats, toggleSeat, isSelectedSeat, saveAndCloseDialog, canSave, info };
  }
}
</script>

