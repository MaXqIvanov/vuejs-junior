<template>
  <div class="home_main_div">
    <div class="container home_main_div__wrapper">
      <div class="form_button_home">
        <div class="form-control">
          <label class="custom_input_home" for="text"><input class="form-control form-control-sm"
          type="text" placeholder="Поиск..."
          aria-label=".form-control-sm example"
          v-model="inputValue" id="textHome" /></label>
        </div>
        <div @click="searchPosts(inputValue)"
        @keydown="searchPosts(inputValue)"
        class="custom_button_search"></div>
      </div>
      <div class="block_arrayMessage" v-if="allPosts.length !== 0">
        <ul class="list" :key="elem.body" v-for="(elem) in allPosts">
          <li class="list-item temp_post_one">
             <div class="text_elem_title"><div class="id_elem_home">{{ elem.id }}</div>
             {{ elem.title }}</div>
            <div class="text_elem_body">{{ elem.body }}</div>
          <div @click="updatefavoritesPosts(elem)"
          @keydown="updatefavoritesPosts(elem)"
          class="custom_style_btn_home"></div>
              </li>
        </ul>
      </div>
      <div class="block_arrayMessage" v-else>
        <div>Найти нужный элемент не получилось</div>
      </div>
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item">
            <div class="page-link" @keydown="changePage(page - 1)"
            @click="changePage(page - 1)">Previous</div>
          </li>
          <ul :key="elem" v-for="(elem) in limit">
          <li class="page-item"><div class="page-link pagination_elem" @keydown="changePage(elem)"
          @click="changePage(elem)">{{ elem }}</div></li>
          </ul>
          <li class="page-item">
            <div class="page-link" @keydown="changePage(page + 1)"
            @click="changePage(page + 1)">Next</div>
          </li>
        </ul>
       </nav>
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
    };
  },
  methods: {
    ...mapMutations({
      changePage: 'home/changePage',
      searchPosts: 'home/searchPosts',
      updatefavoritesPosts: 'home/updatefavoritesPosts',
    }),
    ...mapActions({
      actionGetPosts: 'home/actionGetPosts',
    }),
  },
  watch: {
    inputValue(value) {
      if (value.length > 200) {
        this.inputValue = '';
      }
    },
  },
  mounted() {
    this.actionGetPosts();
    // this.getFavoritesPosts();
  },
  computed: mapState({
    allPosts: (state:any) => state.home.limitPosts,
    limit: (state:any) => state.home.limit,
    page: (state:any) => state.home.page,
  }),
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
  margin: 0 0px;
}

a {
  color: #42b983;
}
.btn-outline-info{
  margin-top: 5px;
}
</style>
