<template>
  <div style="direction: rtl;" class="mt-10">
    <h3>
      فیلم ایرانی
    </h3>
    <section class="ma-auto mb-16" style="width: 80%;">
      <v-list>
        <a href="">
          <v-list-item v-for="(item, index) in items" :key="index" style="display: inline-block;" class="item">
            <v-list-item-avatar>
              <v-img :src="item.image" :alt="item.caption" width="200px" height="auto"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title style="color: black;">{{ item.caption }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </a>
      </v-list>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue';
import image1 from '@/assets/images/hotel.jpeg'
import image2 from '@/assets/images/jangal.jpeg'
import image3 from '@/assets/images/fosil.jpeg'
import image4 from '@/assets/images/gijgah.jpeg'
import image5 from '@/assets/images/zerang.jpeg'
import image6 from '@/assets/images/hert.jpeg'
import image7 from '@/assets/images/aame.jpeg'
import image8 from '@/assets/images/8sobh.jpeg'
import image9 from '@/assets/images/jooje.jpeg'
export default {
  setup() {
    const items = ref([
      {
        image: image1,
        caption: 'هتل'
      },
      {
        image: image2,
        caption: 'جنگل پرتقال'
      },
      {
        image: image3,
        caption: 'فسیل'
      },
      {
        image: image4,
        caption: 'گیجگاه'
      },
      {
        image: image5,
        caption: 'بچه زرنگ'
      },
      {
        image: image6,
        caption: 'شهر هرت'
      },
      {
        image: image7,
        caption: 'عامه پسند'
      },
      {
        image: image8,
        caption: 'حدود هشت صبح'
      },
      {
        image: image9,
        caption: 'جوجه تیغی'
      }
    ]);

    return {
      items
    };
  }
};
</script>
<style>
</style>
