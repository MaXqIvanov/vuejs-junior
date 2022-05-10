<template>
  <div class="home_main_div">
    <div class="container home_main_div__wrapper">
      <div class="form-control">
        <label for="text"><input v-model="inputValue" id="textHome" type="text" /></label>
      </div>
      <button @click="addElem" class="btn">Добавить</button>
      <div class="block_arrayMessage" v-if="$store.state.home.posts.length !== 0">
        <ul class="list" :key="elem.body" v-for="(elem, index) in $store.state.home.posts">
          <li class="list-item">{{ elem.body }} <button @click="removeElem(index)" type="button"
              class="btn btn-outline-info">x</button></li>
        </ul>
      </div>
      <div class="block_arrayMessage" v-else>
        <div>Добавьте ваш первый элемент</div>
      </div>
      <hr />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { mapActions, mapMutations, mapState } from 'vuex';

export default defineComponent({
  name: 'HomePage',
  props: {
    msg: String,
  },
  data() {
    return {
      inputValue: '',
      arrayMessage: [] as any,
    };
  },
  methods: {
    ...mapMutations({
    }),
    ...mapActions({
      actionGetPosts: 'home/actionGetPosts',
    }),
    addElem() {
      if (this.inputValue !== '') {
        this.arrayMessage = [...this.arrayMessage,
          { message: this.inputValue, key: this.arrayMessage.length }];
      }
      this.inputValue = '';
    },
    removeElem(data: any) {
      this.arrayMessage.splice(data, 1);
    },
  },
  watch: {
    inputValue(value) {
      if (value.length > 30) {
        this.inputValue = '';
      }
    },
  },
  mounted() {
    this.actionGetPosts();
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
