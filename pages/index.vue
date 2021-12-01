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
  background-image: url("~/assets/img/bg-img.jpg");
  width: 100%;
  height: auto;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
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
      font-family: Cormorant Garamond;
      font-style: normal;
      font-weight: 600;
      font-size: 50.9091px;
      line-height: 62px;
      text-align: center;
      letter-spacing: 12px;
      text-transform: uppercase;
      color: #dbd8d1;
    }

    h1 {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-wrap: wrap;
      margin: 30px 0 20px 0;

      &::after {
        content: "";
        background: #ccbb9e;
        margin-top: 15px;
        width: 99px;
        height: 1px;
      }
    }

    h2 {
      margin-top: 0px;
    }

    h3 {
      font-family: "Roboto", sans-serif;
      font-style: normal;
      font-weight: 300;
      font-size: 20px;
      line-height: 23px;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: #ffffff;
      text-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
    }
  }
}
.project__container {
  width: 100%;
  height: 100%;

  h1 {
    margin-top: 115px;
    font-family: "Cormorant Garamond", serif;
    font-style: normal;
    font-weight: 500;
    font-size: 38px;
    line-height: 46px;
    text-align: center;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #131217;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;

    &::after {
      content: "";
      background: rgba(215, 174, 122, 0.58);
      width: 120px;
      height: 3px;
      margin-top: 10px;
    }
  }
}

@media screen and (min-width: 320px) and (max-width: 767.99px) {
  .bg__img .header h3 {
    font-size: 12px;
    line-height: 14px;
    text-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  }

  .bg__img .header h1,
  .bg__img .header h2 {
    font-size: 32px;
    line-height: 39px;
    letter-spacing: 1.5px;
    color: #dbd8d1;
  }

  .project__container h1 {
    font-size: 28px;
    line-height: 34px;
    letter-spacing: 2px;
    margin-top: 97px;
  }
}
</style>
