import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Card from "primevue/card";
import InputText from 'primevue/inputtext';
import Button from "primevue/button";
import Aura from '@primevue/themes/nora';
import Password from "primevue/password";
import Image from "primevue/image";

const app = createApp(App);

/*
app.use(PrimeVue, {ripple: true, theme: { preset: Aura , options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: false
        }}});

*/


app.use(PrimeVue, {unstyled: true});


app.component('pv-card', Card)
    .component('pv-inputtext', InputText)
    .component('pv-password', Password)
    .component('pv-button', Button)
    .component('pv-Image', Image);

app.mount('#app');
