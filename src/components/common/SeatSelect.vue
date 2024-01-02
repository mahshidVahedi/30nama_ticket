<template >
  <div id="container">
    <v-responsive>
      <div class="scene">
        صحنه نمایش
      </div>
      <v-responsive id="salon">
        <v-row v-for="row in   salon.aliasY  " :key="row" class="seat-row">
          <v-col v-for="seat in   salon.aliasX  " :key="seat" class="seat-column">
<<<<<<< HEAD
            <v-icon icon="mdi-seat" @click="toggleSeat(row, seat)" :class="{
              'mdi-seat': isSelectedSeat(row.row, seat.column),
              'mdi-seat-occupied': !isSelectedSeat(row.row, seat.column),
              'mdi-seat-disabled': seat.disabled
            }"></v-icon>
=======
            <v-icon
              icon="mdi-seat"
              @click="toggleSeat(row, seat)"
              :class="{
                'mdi-seat': isSelectedSeat(row, seat),
                'mdi-seat-occupied': !isSelectedSeat(row, seat),
                'mdi-seat-disabled': seat.disabled
              }"
            ></v-icon>
>>>>>>> 30e43243458e47c046c9d8ddeb9c05daeadfb2e2
          </v-col>
        </v-row>
      </v-responsive>
    </v-responsive>
  </div>
  <div class="ticket">

    <div dir="rtl" class="ma-8">
      <v-img :src="getSrc(movie.id)" width="75px" class="img">
      </v-img>
      <span>
        <p class="ma-4">
          <v-icon>mdi-movie</v-icon>
          {{ movie.name }}
        </p>
        <p class="ma-4">
          <v-icon>mdi-map-marker</v-icon>
          {{ cinema.name }}
        </p>
        <p class="ma-4">
          <v-icon style="min-width: none;" icon="mdi-clock"></v-icon>
          {{ scene_details.startTime }}
        </p>
      </span>
    </div>
    <v-btn @click="saveAndCloseDialog" :disabled="!canSave" color="red">
      ثبت صندلی و نمایش جزئیات
    </v-btn>
  </div>
</template>

<style>
#container {
  width: 80%;
  margin: auto;
  margin-top: 5%;
  margin-bottom: 5%;
}

.seat {
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

.ticket {
  background-color: #313032;
  padding: 3%;
  color: aliceblue;
}

.img {
  display: inline-block;
}

span {
  display: inline-block;
  margin-right: 3%;
}
</style>
<script>
import { mdiWifi } from '@mdi/js';
import { ref, onMounted, computed } from 'vue';
import router from '@/router';
import image from '@/assets/images/4.jpeg'
export default {
  data: () => ({
    tab: null,
    path: mdiWifi,
  }),
  setup() {
    const salon = ref({});
    const scene_details = ref({})
    const selectedSeats = ref([]);
    const movie = ref({});
    const cinema = ref({});
    fetch('http://185.128.40.150:8080/api/seats/1')
      .then(response => response.json())
      .then(data => {
        scene_details.value = data.scene_details;
        salon.value = data.scene_details.saloon
        movie.value = data.scene_details.movie;
        cinema.value = data.scene_details.cinema;
        const soldSeats = data.sold_tickets.map(salon => ({
          row: salon.seatX,
          column: salon.seatY
        }));
        disableSoldSeats(soldSeats);
      });
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
      router.push({ name: 'Payment' })
    };
    const canSave = computed(() => {
      return selectedSeats.value.length > 0;
    });
    const disableSoldSeats = (soldSeats) => {
      salon.value.seats.forEach(seat => {
        const isSold = soldSeats.some(soldSeat => soldSeat.row === seat.row && soldSeat.column === seat.column);
        seat.disabled = isSold;
      });

    };
    const getSrc = (id) => {
      const src = `/src/assets/images/${id}.jpeg`
      return src;
    }
    return {
      selectedSeats,
      toggleSeat,
      isSelectedSeat,
      saveAndCloseDialog,
      canSave,
      salon,
      getSrc,
      movie,
      cinema,
      scene_details
    };
  },
  inheritAttrs: false
}

</script>
