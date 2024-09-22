import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Card from "primevue/card";
import InputText from 'primevue/inputtext';
import Button from "primevue/button";
import Password from "primevue/password";
import Image from "primevue/image";
import Router from "./router/index.js";

const app = createApp(App);

app.use(PrimeVue, {unstyled: true});
app.use(Router);


app.component('pv-card', Card)
    .component('pv-inputtext', InputText)
    .component('pv-password', Password)
    .component('pv-button', Button)
    .component('pv-Image', Image);

app.mount('#app');
