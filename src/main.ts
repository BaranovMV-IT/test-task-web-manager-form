import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const VUETIFY = createVuetify({
  components,
  directives,
});
const PINIA = createPinia();
const APP = createApp(App);

APP
  .use(VUETIFY)
  .use(PINIA)
  .mount('#app')
