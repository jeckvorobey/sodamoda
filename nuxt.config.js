export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Главная страница",
    htmlAttrs: {
      lang: "ru",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" },
      { name: "format-detection", content: "telephone=no" },
      { name: "author", content: "arlix.ru" },
      { name: "application-name", content: "&nbsp;" },
      { name: "msapplication-TileColor", content: "#FFFFFF" },
      { name: "msapplication-TileImage", content: "/favicon/mstile-144x144.png" },
      { name: "msapplication-square70x70logo", content: "/favicon/mstile-70x70.png" },
      { name: "msapplication-square150x150logo", content: "/favicon/mstile-150x150.png" },
      { name: "msapplication-wide310x150logo", content: "/favicon/mstile-310x150.png" },
      { name: "msapplication-square310x310logo", content: "/favicon/mstile-310x310.png" },
    ],
    link: [
      { rel: "apple-touch-icon-precomposed", sizes: "57x57", href: "/favicon/apple-touch-icon-57x57.png" },
      { rel: "apple-touch-icon-precomposed", sizes: "114x114", href: "/favicon/apple-touch-icon-114x114.png" },
      { rel: "apple-touch-icon-precomposed", sizes: "72x72", href: "/favicon/apple-touch-icon-72x72.png" },
      { rel: "apple-touch-icon-precomposed", sizes: "144x144", href: "/favicon/apple-touch-icon-144x144.png" },
      { rel: "apple-touch-icon-precomposed", sizes: "60x60", href: "/favicon/apple-touch-icon-60x60.png" },
      { rel: "apple-touch-icon-precomposed", sizes: "120x120", href: "/favicon/apple-touch-icon-120x120.png" },
      { rel: "apple-touch-icon-precomposed", sizes: "76x76", href: "/favicon/apple-touch-icon-76x76.png" },
      { rel: "apple-touch-icon-precomposed", sizes: "152x152", href: "/favicon/apple-touch-icon-152x152.png" },
      { rel: "icon", type: "image/png", sizes: "196x196", href: "/favicon/favicon-196x196.png" },
      { rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon/favicon-96x96.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon/favicon-16x16.png" },
      { rel: "icon", type: "image/png", sizes: "128x128", href: "/favicon/favicon-128x128.png" },
    ],
  },
  loadingIndicator: {
    name: '~/assets/loader-progress.html',
    img: '/loading.svg'
  },
  //loading: false,
  loading: '~/components/nuxt-loading.vue',
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/fonts/SFProDisplay/stylesheet.css",
    "~/assets/css/global.css",
    "vue-tel-input/dist/vue-tel-input.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/forward-set-cookie.js', mode: 'server' },
    { src: '@/plugins/vue-lazy-load.js' },
    { src: '@/plugins/axios-global-loader.js' },
    { src: '@/plugins/axios-global-not-loader.js' },
    { src: '@/plugins/gsap_reg_module.client.js' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    ["cookie-universal-nuxt", { alias: "cookiz" }],
    "@nuxtjs/proxy",
    ['@nuxtjs/i18n', {
      vueI18nLoader: true,
      detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'i18n_redirected',
        alwaysRedirect: false,
        fallbackLocale: 'en'
      },
      locales: [
        {
          name: 'Русский',
          code: 'ru',
          iso: 'ru-RU',
          file: 'ru-RU.js'
        },
        {
          name: 'English',
          code: 'en',
          iso: 'en-US',
          file: 'en-US.js'
        },
      ],
      lazy: true,
      langDir: 'lang/',
      strategy: 'prefix_except_default',
      defaultLocale: 'ru',
    }],
  ],
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    //baseUrl: 'http://dev.bulvin.com/api',
    //baseUrl: 'http://localhost:65057/',
    debug: false,
    credentials: true,
    common: {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    },
    proxy: true,
  },
  proxy: {
    // Simple proxy
    "/api/": { target: 'http://dev.bulvin.com/', changeOrigin: true },
    "/local/": { target: 'http://dev.bulvin.com/', changeOrigin: true },
    "/bitrix/": { target: 'http://dev.bulvin.com/', changeOrigin: true },
    // "/api/": { target: 'http://localhost:3000/', changeOrigin: true },
    // "/local/": { target: 'http://localhost:3000/', changeOrigin: true },
    // "/bitrix/": { target: 'http://localhost:3000/', changeOrigin: true },
    //"/test": "http://localhost:3000/test",
  },
  server: {
    host: '0.0.0.0'
    // host: 'bulvin.com'
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: ['vue-lazy-hydration', 'intersection-observer', 'gsap'],
  }
};
