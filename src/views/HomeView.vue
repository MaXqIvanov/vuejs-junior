<template>
  <div class="home">
    <HomePage msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HomePage from '@/components/HomeViewComponents/HomePage.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'HomeView',
  components: {
    HomePage,
  },
});
</script>
