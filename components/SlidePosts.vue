<template>
  <div>
    <Loading v-if="$fetchState.pending" />
    <p v-else-if="$fetchState.error">Хмм...Я сам не понял!</p>
    <vue-horizontal-list v-else :items="posts" :options="options">
      <template v-slot:nav-prev>
        <div class="left__prev">
          <img src="~/assets/img/left-slide.jpg" alt="LeftSlide" />
        </div>
        <img
          class="svg__arrow left"
          src="~/assets/img/arrow-left.svg"
          alt="LeftArrow"
        />
      </template>

      <template v-slot:nav-next>
        <div class="right__prev">
          <img src="~/assets/img/right-slide.jpg" height="788px" alt="LeftSlide" />
        </div>
        <img
          class="svg__arrow right"
          src="~/assets/img/arrow-right.svg"
          alt="RightArrow"
        />
      </template>

      <template v-slot:default="posts">
        <div class="project__list">
          <img
            class="slide__img"
            src="~/assets/img/post_img.png"
            alt="PostsSlideImage"
          />
          <p>
            Архитектура <span>300 m<sup>2</sup></span>
          </p>
          <NuxtLink
            class="link--posts"
            v-for="(post, id) in posts"
            :key="id"
            :to="{ name: 'posts-id', params: { id: post.id } }"
          >
            {{ post.title }}
          </NuxtLink>
        </div>
      </template>
    </vue-horizontal-list>
  </div>
</template>

<script>
import Vue from "vue";
import VueHorizontalList from "vue-horizontal-list/src/vue-horizontal-list.vue";

export default Vue.extend({
  name: "SlidePosts",
  components: {
    VueHorizontalList,
  },
  data() {
    return {
      posts: [],

      options: {
        responsive: [{ size: 1 }],
        list: {
          windowed: 1400,
          padding: 24,
        },
        position: {
          start: 1,
        },
        autoplay: { play: true, repeat: true, speed: 5500 },
      },
    };
  },

  activated() {
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch();
    }
  },

  async fetch() {
    this.posts = await this.$http.$get(
      "https://jsonplaceholder.typicode.com/posts"
    );
  },
});
</script>
<style lang="scss">
.vue-horizontal-list {
  margin: 0 auto;
  width: 100%;
  overflow: hidden;

  .vhl-item {
    margin-left: 35px;
  }

  .vhl-btn-left,
  .vhl-btn-right {
    width: 46px;
    height: 29px;
    position: relative;
    top: -85px;
    color: rgba(66, 75, 90, 0.6);
    display: flex;
    align-items: center;
    box-shadow: none !important;
    background: transparent !important;
    border-radius: none;
    z-index: 2;
    transition: all 1s;

    &:hover {
      color: #f4b470;
    }
  }

  .vhl-btn-right {
    margin-left: auto;
    margin-right: 305px !important;
  }

  .vhl-btn-left {
    margin-right: auto;
    margin-left: 115px !important;
  }

  .left__prev {
    position: relative;
    top: 10px;
    left: -60px;
  }

  .right__prev {
    position: relative;
    top: 14px;
    right: -270px;
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
    max-width: 1312px;
    height: 777px;
    background: linear-gradient(
      0deg,
      rgba(228, 224, 216, 0.14),
      rgba(228, 224, 216, 0.14)
    );
    background-blend-mode: color, normal;
    margin: 0px auto 35px auto;
  }

  p,
  .link--posts {
    text-transform: uppercase;
    align-self: flex-start;
    padding-bottom: 10px;
  }

  p,
  span {
    font-family: "PT Sans", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    letter-spacing: 2px;
    color: #131217;

    span {
      font-weight: bold;
      color: #bf9c62;
    }
  }

  p {
    margin-left: 16vw;
  }

  .link--posts {
    font-family: "Cormorant Garamond", serif;
    font-style: normal;
    font-weight: normal;
    font-size: 42px;
    line-height: 51px;
    letter-spacing: 2px;
    text-decoration: none;
    text-align: left;
    color: #131217;
    margin-left: 16vw;

    &:hover {
      color: #f4b470;
    }

    &:visited {
      color: #bf9c62;
    }
  }
}

@media (max-width: 1799.99px) {
  .vue-horizontal-list {

    .vhl-btn-right {
      margin-right: 45px !important;
    }

    .vhl-btn-left {
      margin-left: 45px !important;
    }

    .left__prev {
      display: none;
    }

    .right__prev {
      display: none;
    }
  }
}

@media (max-width: 1799.99px) {
  .vue-horizontal-list {

    .project__list .slide__img {
      max-width: 1000px;
    }

    .vhl-btn-right {
      position: absolute;
      margin-right: 0px !important;
      right: 40px;
      top: 45%;
    }

    .vhl-btn-left {
      position: absolute;
      margin-left: 0px !important;
      left: 40px;
      top: 45%;
    }
  }
}

@media (min-width: 1440px) and (max-width: 1799px) {
  .project__list {
    p {
      margin-left: 20vw;
    }

    .link--posts {
      margin-left: 20vw;
    }
  }
}

@media (min-width: 768px) and (max-width: 1439.99px) {
  .project__list {
    p {
      margin-left: 1vw;
    }

    .link--posts {
      margin-left: 1vw;
    }
  }
}

@media screen and (min-width: 320px) and (max-width: 767.99px) {
  .vue-horizontal-list {
    .vhl-item {
      margin-left: 0px;
    }
  }

  .project__list {
    margin-left: 13vw;

    .slide__img {
      width: 100%;
      height: auto;
      margin-top: 33px;
    }

    p {
      align-self: center;
      margin-left: 0px;
      font-size: 10px;
      line-height: 13px;
      letter-spacing: 2px;
    }

    .link--posts {
      width: 100%;
      margin-left: 0px;
      align-self: center;
      text-align: center;
      font-size: 24px;
      line-height: 29px;
      letter-spacing: 2px;
    }
  }
}
</style>
