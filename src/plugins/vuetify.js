import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1976D2',
          secondary: '#424242',
          success: '#4CAF50',
          error: '#FF5252',
          background: '#FFFFFF', // Background color for light mode
          toolbar: '#000000', // Background color for toolbar in light mode
        },
      },
      dark: {
        colors: {
          primary: '#2196F3',
          secondary: '#b0bec5',
          success: '#4CAF50',
          error: '#FF5252',
          background: '#121212', // Background color for dark mode
          toolbar: '#FFFFFF', // Background color for toolbar in dark mode
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});
