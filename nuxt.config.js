import colors from "vuetify/es5/util/colors";

export default {
  ssr: false,
  target: "static",
  router: {
    base: "/why-hide/"
  },
  loadingIndicator: {
    name: "folding-cube",
    color: "orange",
    background: "#121212"
  },
  publicRuntimeConfig: {
    prefix: "https://beta.pushshift.io/search/reddit/"
  },
  head: {
    title: "Why hide?",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Why hide?"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  css: [],

  modules: ["@nuxtjs/axios", "./codesandbox"],

  components: true,

  buildModules: ["@nuxtjs/vuetify"],

  telemetry: false,

  plugins: [],

  axios: {
    proxy: true
  },

  proxy: {
    "/api/": {
      target: "https://beta.pushshift.io/search/reddit/",
      pathRewrite: { "^/api/": "" }
    }
  },

  vuetify: {
    treeShake: true,
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.deepOrange.accent1,
          accent: colors.teal.darken1,
          secondary: colors.deepOrange.accent1,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent3,
          success: colors.green.accent3
        }
      }
    }
  },

  build: {
    extend(config, ctx) {}
  }
};
