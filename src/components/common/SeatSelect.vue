<template>
  <div id="container">
    <v-responsive>
      <div class="scene">
        صحنه نمایش
      </div>
      <v-responsive id="salon">
        <v-row class="mr-3 nums">
          <v-col v-for="seat in   salon.aliasX  " :key="seat">
            <div class="num">
              {{ seat }}</div>
          </v-col>
        </v-row>
        <v-row v-for="row in   salon.aliasY  " :key="row" class="seat-row">
          <p class="mt-3 ml-3">
            {{ row }}
          </p>
          <v-col v-for="seat in   salon.aliasX  " :key="seat" class="seat-column">
            <v-icon icon="mdi-seat" @click="toggleSeat(row, seat)" :class="{
              'mdi-seat': isSelectedSeat(row, seat),
              'mdi-seat-occupied': !isSelectedSeat(row, seat),
              'mdi-seat-disabled': disableSoldSeats(row, seat)
            }"></v-icon>
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
    <v-btn @click="saveSelectedSeats" :disabled="!canSave" color="red">
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

.num {
  padding: 6.5px;
}

.v-icon.mdi-seat {
  color: green;
  font-size: 24px;
}

.v-icon.mdi-seat-occupied {
  color: rgb(84, 66, 66);
  font-size: 24px;
}
.v-icon.mdi-seat-disabled{
  display: none;
}

.scene {
  width: 80%;
  background-color: #807e7e;
  margin: auto;
  border-radius: 10px;
  text-align: center;
  padding: 8px;
  margin-bottom: 5%;
  margin-right: 8%;
}

#salon {
  width: 80%;
  margin: auto;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
  overflow-y: scroll;
  padding: 15px;
}

.nums {
  display: flex;
  flex-wrap: nowrap;
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
import { mdiPackageVariantClosedMinus, mdiWifi } from '@mdi/js';
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
export default {
  data: () => ({
    tab: null,
    path: mdiWifi,
  }),
  setup() {
    const router = useRouter();
    const route = useRoute();
    const salon = ref({});
    const scene_details = ref({})
    const selectedSeats = ref([]);
    const sold_tickets = ref([]);
    const movie = ref({});
    const cinema = ref({});
    const movie_id = ref('');
    const saloon_id = ref('');
    const cinema_id = ref('');
    const scene_route = route.params.id;
    let scene_id = parseInt(scene_route, 10);
    fetch('https://nramezon.shop/api/seats/' + route.params.id)
      .then(response => response.json())
      .then(data => {
        scene_details.value = data.scene_details;
        salon.value = data.scene_details.saloon;
        movie.value = data.scene_details.movie;
        cinema.value = data.scene_details.cinema;
        movie_id.value = movie.value.id;
        saloon_id.value = salon.value.id;
        cinema_id.value = cinema.value.id;
        sold_tickets.value = data.sold_tickets.map(salon => ({
          row: salon.seatX,
          column: salon.seatY
        }));
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
    const disableSoldSeats = (row, seat) => {
  const isSold = sold_tickets.value.some(ticket => ticket.row === row && ticket.column === seat);
  return isSold;
};
    const getSrc = (id) => {
      const baseUrl = "/";
      const src = `${baseUrl}assets/images/${id}.jpeg`;
      return src;
    };
    const saveSelectedSeats = async () => {
      try {
        const seats = selectedSeats.value.map(seat => {
          const [seatx, seatNumber] = seat.split('-');
          let seatX=parseInt(seatx, 10);
          let seatY=parseInt(seatNumber, 10);
          return { seatX , seatY };
        });
        const jsonData = JSON.stringify({
          scene_id,
          saloon_id: saloon_id.value,
          movie_id: movie_id.value,
          cinema_id: cinema_id.value,
          seats: seats,
        });
        const response = await fetch('https://nramezon.shop/api/buy_tickets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: jsonData,
        });

        if (response.ok) {
          const data = await response.json();
          router.push('/ticket/token/pre/' + data.token);
        } else {
          console.log('Failed to save seats');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
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
      scene_details,
      saveSelectedSeats,
      disableSoldSeats
    };
  },
  inheritAttrs: false
}
</script>
