<template id="page">
  <div id="container">
    <v-responsive id="kooft">
      <div class="scene">
        صحنه نمایش
      </div>
      <v-responsive id="salon" >
        <!-- <v-infinite-scroll direction="horizontal"> -->
        <v-row v-for="row in 10" :key="row" class="seat-row">
            <v-col v-for="seat in 20" :key="seat" class="seat-column">
              <v-icon icon="mdi-seat" @click="toggleSeat(row, seat)" :class="{
                'mdi-seat': isSelectedSeat(row, seat),
                'mdi-seat-occupied': !isSelectedSeat(row, seat)
              }"></v-icon>
            </v-col>
        </v-row>
        <!-- </v-infinite-scroll> -->
      </v-responsive>
    </v-responsive>
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
#page {}
/* #kooft{
  display: flex;
  flex-wrap: nowrap;
  overflow-wrap: scroll;
} */

#container {
  width: 80%;
  margin: auto;
  margin-top: 5%;
}
.seat{
  flex-wrap: nowrap;
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
  background-color: #807e7e;
  margin: auto;
  border-radius: 10px;
  text-align: center;
  padding: 8px;
  margin-bottom: 5%;
}

#salon {
  width: 90%;
  margin: auto;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
  overflow-y: scroll;
  padding: 15px;
}

.seat-row {
  display: flex;
  flex-wrap: nowrap;
  padding: 5px;
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

