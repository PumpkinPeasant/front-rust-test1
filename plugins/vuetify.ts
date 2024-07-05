import { createVuetify } from "vuetify";
import { md3 } from "vuetify/blueprints";
import { ru } from 'vuetify/locale'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    blueprint: md3,
    theme: {},
    locale:{
      locale: 'ru',
      messages: { ru },
    },
  });

  app.vueApp.use(vuetify);
});
