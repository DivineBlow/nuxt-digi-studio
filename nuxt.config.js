export default {
  target: "server",
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "STUDIO-KORA",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "DigitalStudio" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com"
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossorigin: true
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,700&family=PT+Sans&family=Roboto:wght@300;400;500&display=swap"
      }
    ],
    script: [
      {
        src: "/js/TweenMax.min.js",
        body: true,
        async: true
      },
      {
        src: "/js/main.js",
        async: true
      }
    ],
  },
  generate: {
    fallback: true,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/scss/normalize.css",
    "~/assets/scss/style.scss",
    "~/assets/scss/responsive.scss",
  ],

  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      }
    }
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/style-resources"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxt/http"],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["vue-horizontal-list"],
  },
};
