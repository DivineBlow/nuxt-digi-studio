<template>
  <div>
    <Loading v-if="$fetchState.pending" />
    <p v-else-if="$fetchState.error">Хмм...Я сам не понял!</p>
    <vue-horizontal-list v-else :items="posts" :options="options">
        <template v-slot:nav-prev>
          <img class="svg__arrow" src="~/assets/img/arrow-left.svg" alt="LeftArrow">
        </template>

        <template v-slot:nav-next>
          <img class="svg__arrow" src="~/assets/img/arrow-right.svg" alt="RightArrow">
        </template>
        <template v-slot:default="posts">
          <ul class="project__list">
            <img class="slide__img" src="~/assets/img/post_img.png" />
            <p>Архитектура <span>300 m<sup>2</sup></span></p>
            <NuxtLink v-for="(post, id) in posts" :key="id"
              :to="{ name: 'posts-id', params: { id: post.id } }"
            >
              {{ post.title }}
            </NuxtLink>
          </ul>
      </template>
    </vue-horizontal-list>
  </div>
</template>

<script>
import Vue from "vue";
import VueHorizontalList from "vue-horizontal-list/src/vue-horizontal-list.vue";

export default Vue.extend({
  name: 'SlidePosts',
  components: {
    VueHorizontalList,
  },
  data() {
    return {
      posts: [],

      options: {
        responsive: [
          { end: 576, size: 1 },
          { start: 576, end: 768, size: 1 },
          { start: 768, end: 992, size: 1 },
          { size: 1 },
        ],
        list: {
          // 1200 because @media (min-width: 1200px) and therefore I want to switch to windowed mode
          windowed: 1200,

          // Because: #app {padding: 80px 24px;}
          padding: 50,
        },
        position: {
        // Start from '1' on mounted.
        start: 2,
      },
        autoplay: { play: true, repeat: true, speed: 5500 },
      },
    }
  },

  activated() {
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
    }
  },

  async fetch() {
    this.posts = await this.$http.$get('https://jsonplaceholder.typicode.com/posts')
  }
});

</script>
<style lang="scss">
.vue-horizontal-list {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;

  .vhl-item {
    margin-left: 35px;
  }

  .vhl-btn-left,
  .vhl-btn-right {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    box-shadow: none;
    background: transparent;
    border-radius: none;
    z-index: 2;

    &:hover {
      color: #f4b470;
    }
  }

  .vhl-btn-right {
    margin-left: auto;
    margin-right: -100px;
  }

  .vhl-btn-left {
    margin-right: auto;
    margin-left: -100px;
  }

  .svg__arrow {
    width: 70px;
  }
}

.project__list {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  z-index: 1;

  .slide__img {
    width: 100%;
    height: auto;
    max-height: 777px;
    background: rgba(228, 224, 216, 0.14);
    background-blend-mode: color, normal;
    margin: 60px auto;
  }

  p, a {
    align-self: flex-start;
    padding-bottom: 20px;
    text-align: left;
  }

  p {
    font-family: PT Sans;
    line-height: 15px;
    text-align: center;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #131217;
    font-size: .8rem;

    span {
      color: #BF9C62;
    }
  }

  a {
    color: #131217;
    font-size: 2rem;
    line-height: 30px;
    letter-spacing: 2px;
    text-transform: capitalize;
    text-decoration: none;

    &:hover {
      color: #f4b470;
    }

    &:visited {
      color: #BF9C62;
    }
  }
}
</style>
