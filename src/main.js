import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import router from './router'; // Add this line

loadFonts();

createApp(App)
  .use(vuetify)
  .use(router)  // Add this line
  .mount('#app');
