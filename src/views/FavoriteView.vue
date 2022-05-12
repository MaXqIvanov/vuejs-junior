<template>
  <div class="container favorite">
    <FavoritePage />
    <hr>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import '../scss/favorite.scss';
import FavoritePage from '@/components/FavoriteViewComponents/FavoritePage.vue';

export default defineComponent({
  name: 'FavoriteView',
  components: {
    FavoritePage,
  },
});
</script>
