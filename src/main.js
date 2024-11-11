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
import Toolbar from "primevue/toolbar";
import i18n from "./i18n.js";
import Calendar from "primevue/calendar";
import Dialog from "primevue/dialog";
import ToggleButton from "primevue/togglebutton";
import 'primeicons/primeicons.css'
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import store from "./shared/stores/validation-store.js";
import MeterGroup from "primevue/metergroup";
import ProgressSpinner from "primevue/progressspinner";
import Chart from "primevue/chart";
import Carousel from "primevue/carousel";
import RadioButton from "primevue/radiobutton";

const app = createApp(App);

app.use(PrimeVue, {unstyled: true});
app.use(Router);
app.use(i18n);
app.use(store);

app.component('pv-card', Card)
    .component('pv-inputtext', InputText)
    .component('pv-password', Password)
    .component('pv-button', Button)
    .component('pv-Image', Image)
    .component('pv-toolbar', Toolbar)
    .component('pv-togglebutton', ToggleButton)
    .component('pv-iconfield', IconField)
    .component('pv-calendar', Calendar)
    .component('pv-dialog', Dialog)
    .component('pv-inputicon', InputIcon)
    .component('pv-metergroup', MeterGroup)
    .component('pv-progress-spinner', ProgressSpinner)
    .component('pv-carousel', Carousel)
    .component('pv-radiobutton', RadioButton)
    .component('Chart', Chart);



app.mount('#app');

