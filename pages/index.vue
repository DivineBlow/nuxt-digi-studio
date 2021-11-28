<template>
  <div>
    <Loading v-if="$fetchState.pending" />
    <p v-else-if="$fetchState.error">Похоже что мы пропали...</p>
    <!-- Header -->
    <div v-else id="head" class="bg__img">
      <div class="header">
        <h3>Меняем качество жизни</h3>
        <h1>Архитектура</h1>
        <h2>Дизайн интерьера</h2>
      </div>
    </div>
    <!-- Slides -->
    <div class="project__container">
      <div class="project">
        <h1>Проекты</h1>
        <SlidePosts />
      </div>
    </div>
    <!-- Contact -->
    <Contact />
  </div>
</template>

<script>
export default {
  head: {
    title: "Главная",
  },
  data() {
    return {
      posts: [],
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
};
</script>

<style lang="scss" scoped>
:root {
  font-size: 16px;
}

#sticky__nav {
  background: transparent;
  z-index: 100;

  .menu__nav a {
    color: #cccbc6;
  }
}

.bg__img {
  background-image: url("~/assets/img/bg-img.png");
  width: 100%;
  min-height: 870px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;

  .header {
    display: flex;
    width: 100%;
    height: 800px;
    flex-direction: column;
    justify-content: center;

    h1,
    h2,
    h3 {
      text-transform: uppercase;
    }

    h1,
    h2 {
      color: #dbd8d1;
      font-style: normal;
      font-weight: 600;
      font-size: clamp(3rem, 3rem, 2.5rem);
      line-height: 62px;
      letter-spacing: 12px;
    }

    h1 {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-wrap: wrap;

      &::after {
        content: "";
        background: rgba(215, 174, 122, 0.58);
        margin-top: 40px;
        width: 100px;
        height: 1px;
      }
    }

    h3 {
      color: #fff;
      font-family: Roboto;
      font-style: normal;
      font-weight: 300;
      font-size: clamp(1em, 2em, 1.5em);
      line-height: 23px;
      letter-spacing: 4px;
    }
  }
}
.project__container {
  width: 100%;
  height: 100%;
  max-height: 1500px;
  position: absolute;
  margin-top: 850px;

  h1 {
    margin-top: 100px;
    text-transform: uppercase;
    font-size: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;

    &::after {
      content: "";
      background: rgba(215, 174, 122, 0.58);
      width: 120px;
      height: 3px;
    }
  }
}

@media screen and (min-width: 320px) and (max-width: 767.99px) {
  .header h1,
  h2 {
    font-size: 5vw !important;
  }
}
</style>
