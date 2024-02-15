<template>
  <div id="container">
    <v-responsive>
      <div class="scene">
        صحنه نمایش
      </div>
      <v-responsive id="salon" class="d-none d-sm-flex">
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
      <div class="d-flex d-sm-none flex-column ">
        <canvas ref="canvasRef" @click="handleCanvasClick"></canvas>
        <div class="d-flex flex-row justify-space-around mt-5">
          <v-btn color="red" @click="zoomIn">+</v-btn>
          <v-btn color="red" @click="zoomOut">-</v-btn>
        </div>

      </div>
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
          {{ separateDateTime(scene_details.startTime) }}
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

.v-icon.mdi-seat-disabled {
  color: darkblue;
  cursor: not-allowed;
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
    fetch('https://spweird.fun/api/seats/' + route.params.id)
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
          let seatX = parseInt(seatx, 10);
          let seatY = parseInt(seatNumber, 10);
          return { seatX, seatY };
        });
        const jsonData = JSON.stringify({
          scene_id,
          saloon_id: saloon_id.value,
          movie_id: movie_id.value,
          cinema_id: cinema_id.value,
          seats: seats,
        });
        const response = await fetch('https://spweird.fun/api/buy_tickets', {
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

    const getMonth = (month) => {
      switch (month) {
        case '1':
          return 'فروردین';
        case '2':
          return 'اردیبهشت';
        case '3':
          return 'خرداد';
        case '4':
          return 'تیر';
        case '5':
          return 'مرداد';
        case '6':
          return 'شهریور';
        case '7':
          return 'مهر';
        case '8':
          return 'آبان';
        case '9':
          return 'آذر';
        case '10':
          return 'دی';
        case '11':
          return 'بهمن';
        case '12':
          return 'اسفند';
        default:
          return '';
      }
    }

    const separateDateTime = (input) => {
      if (input) {
        const [date, time] = input.split(' ');
        const [year, month, day] = date.split('-');
        const [hour, minute, second] = time.split(':')
        const monthName = ref('');
        monthName.value = getMonth(month)
        const formattedDate = `${day} ${monthName.value}`;
        const formattedTime = `${hour}:${minute}`;

        return `${formattedDate} ساعت ${formattedTime}`;
      }

    };



    //ssmaller screen seat :
    const canvasRef = ref(null);
    let zoomLevel = ref(1);
    const matrixSize = 5;
    let squareSize = 50; 
    const minSquareSize = 50;
    const maxSquareSize = 100; 
    let viewX = 0; 
    let viewY = 0; 
    const initialSquareSize = 50; 
    const drawMatrix = () => {
      const canvas = canvasRef.value;
      const ctx = canvas.getContext('2d');

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < matrixSize; i++) {
        for (let j = 0; j < matrixSize; j++) {
          const squareNumber = i * matrixSize + j + 1;
          ctx.fillStyle = 'grey';
          const x = (i * (squareSize + 2)) - viewX;
          const y = (j * (squareSize + 2)) - viewY;
          ctx.fillRect(x, y, squareSize, squareSize);

          ctx.fillStyle = 'white';
          ctx.font = '12px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(squareNumber, x + squareSize / 2, y + squareSize / 2);
        }
      }
    };

    const handleCanvasClick = (event) => {
      const canvas = canvasRef.value;
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const clickedSquareX = Math.floor((mouseX + viewX) / squareSize);
      const clickedSquareY = Math.floor((mouseY + viewY) / squareSize);

      if (squareSize < maxSquareSize) {
        squareSize *= 1.2;
        zoomLevel.value *= 1.2;

        viewX = Math.max(0, clickedSquareX * squareSize - canvas.width / 2);
        viewY = Math.max(0, clickedSquareY * squareSize - canvas.height / 2);

        drawMatrix();
      };
    }

    const zoomIn = () => {
      if (squareSize < maxSquareSize) {
        squareSize *= 1.2;
        zoomLevel.value *= 1.2;
        drawMatrix();
      }
    };

    const zoomOut = () => {
      squareSize = initialSquareSize;
      zoomLevel.value = 1;
      viewX = 0;
      viewY = 0;

      drawMatrix();
    };

    onMounted(() => {
      const canvas = canvasRef.value;
      canvas.width = matrixSize * squareSize;
      canvas.height = matrixSize * squareSize;
      drawMatrix();
    });


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
      disableSoldSeats,
      separateDateTime,
      canvasRef,
      handleCanvasClick,
      zoomIn,
      zoomOut,
    };
  },
  inheritAttrs: false
}
</script>
