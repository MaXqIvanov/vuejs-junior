<template>
    <div class="main_block_favoritePage">
      <h2>Избранное</h2>
        <ul :key="elem.body" v-for="(elem) in favoritesPosts" class="list">
          <li class="list-item temp_post_fav">
              <div class="text_elem_title"><div class="id_elem_home">{{ elem.id }}</div>
             {{ elem.title }}</div>
            <div class="text_elem_body">{{ elem.body }}</div>
            <div @click="deleteFavoritePost(elem)"
            @keydown="deleteFavoritePost(elem)" class="btn_favorites_delete"></div>
          </li>
        </ul>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { mapActions, mapMutations, mapState } from 'vuex';

export default defineComponent({
  name: 'FavoritePage',
  // props: {
  // },
  data() {
    return {
    };
  },
  methods: {
    ...mapMutations({
      getFavoritesPosts: 'favorite/getFavoritesPosts',
      deleteFavoritePost: 'favorite/deleteFavoritePost',
    }),
    ...mapActions({
    }),
  },
  watch: {
  },
  mounted() {
    this.getFavoritesPosts();
  },
  computed: mapState({
    favoritesPosts: (state:any) => state.favorite.favoritesPosts,
  }),
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 0px;
}
</style>
