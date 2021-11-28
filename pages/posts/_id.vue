<template>

    <!-- Loading -->
  <Loading v-if="$fetchState.pending" />
  <p v-else-if="$fetchState.error">Что-то пошло не так...</p>
  <article v-else class="project__id">
    <button class="button__id" @click="goBack"><span>Главная</span> {{ posts.id }}</button>
    <h1 class="title__id">{{ posts.title }}</h1>
    <section>
      <p class="body__id">{{ posts.body }}</p>
    </section>
    <img class="project__img" src="~/assets/img/post_img.png" />
  </article>

</template>

<script>
export default {
  name: 'posts_id',
  head () {
    return {
      id: this.posts.id
    }
  },
  data() {
    return {
      posts: {}
    }
  },
  async fetch() {
    this.posts = await this.$http.$get(
      `https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}`
    )
  },
  methods: {
    goBack() {
      return this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>

:root {
  font-size: 16px;
}

.project__id {
  width: 875px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: 0 auto;

  .button__id {
    align-self: center;
    padding: 10px;
    outline: none;
    border-radius: 0.5rem;
    font-size: 2rem;
    border: none;
    cursor: pointer;
    color: #757470;
    background-color: transparent;
    font-weight: 500;
    text-transform: uppercase;
    box-shadow: none;
    margin: 0 0.5rem;
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

    span {
      color: #131217;
      font-size: 1.2rem;

      &:hover {
        color: #f4af37;
      }
    }
  }

  .title__id {
    font-weight: 600;
    font-size: 3rem;
    line-height: 52px;
    text-align: center;
    letter-spacing: 12px;
    text-transform: uppercase;
    color: #131217;
  }

  .body__id {
    font-family: Roboto;
    font-style: normal;
    font-weight: 300;
    font-size: 1.2rem;
    line-height: 30px;
    color: #131217;
  }

  .project__img {
    width: 100%;
    max-width: 875px;
    height: auto;
    max-height: 625px;
    margin-bottom: 400px;
  }
  p {
    text-align: center;
  }
}

@media (min-width: 320px) and (max-width: 1199.99px) {
  .project__id {
    width: 100%;

    .title__id {
      font-size: 1rem;
    }

    .body__id {
      font-size: .8rem;
      padding: 10px;
    }

    .project__img {
      padding: 25px;
      margin: 0 auto;

    }
  }
}


</style>
