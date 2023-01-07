/* eslint-disable vue/multi-word-component-names */
import { createApp } from "vue";
import { createPinia } from "pinia";

import PrimeVue from "primevue/config";
import Card from "primevue/card";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import InputText from "primevue/inputtext";
import Column from "primevue/column";
import Dropdown from "primevue/dropdown";
import Textarea from "primevue/textarea";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";

import router from "./router";

import App from "./App.vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue);
app.use(ToastService);

app.component("Card", Card);
app.component("Button", Button);
app.component("DataTable", DataTable);
app.component("InputText", InputText);
app.component("Column", Column);
app.component("Dropdown", Dropdown);
app.component("Textarea", Textarea);
app.component("Toast", Toast);

app.mount("#app");
