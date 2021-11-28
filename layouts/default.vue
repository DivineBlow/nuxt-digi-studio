<template>
  <div>
    <Navigation/>
    <main class="content">
      <Nuxt keep-alive />
    </main>
  </div>
</template>

<script>
export default {
  head() {
    return {
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'DigitalStudioKora',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'digital, studio, nuxt, vue, js, css, slide, carousel',
        },
      ],
    }
  },
}
</script>

