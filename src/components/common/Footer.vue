<template>
  <v-footer id="footer" height="40px" class=" d-flex fixed flex-row  justify-space-between p-0 mt-2">
    <div class="d-flex flex-row">
      <v-btn color="white" variant="plain" icon="mdi-instagram"></v-btn>
      <v-btn color="white" variant="plain" icon="mdi-facebook"></v-btn>
      <v-btn color="white" variant="plain" icon="mdi-twitter"></v-btn>
    </div>
    <div class="d-flex flex-row">
      <v-btn color="white" variant="text" class="ma-2 pa-2 d-none d-sm-flex"> آرشیو فیلم ها </v-btn>
      <v-btn color="white" variant="text" class="ma-2 pa-2">جدول فروش </v-btn>
    </div>
  </v-footer>
</template>

<style>
#footer {
  width: 100%;
  background-color: rgb(69, 69, 71);
  position: fixed;
  bottom: 0%;
}
</style>
<script lang="js">
export default {
  name: 'Footer',
  setup() {

    const icons = [
      'mdi-facebook',
      'mdi-telegram',
      'mdi-instagram',
    ]

    const items = [
      'جدول فروش'
    ]

    return { items, icons }
  }
}
</script>
