<template>
  <div class='home_main_div'>
    <div class="container home_main_div__wrapper">
      <div class="form-control">
        <label for="text"><input id="textHome" type="text"></label>
      </div>
      <button class="btn">Добавить</button>
      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomePage',
  props: {
    msg: String,
  },
  data() {
    return {
      counter: 0,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
