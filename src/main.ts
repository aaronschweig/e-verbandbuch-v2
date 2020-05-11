import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import Textarea from "@/components/Textarea.vue";
import "@/css/tailwind.css";

Vue.config.productionTip = false;

Vue.component("ev-input", Input);
Vue.component("ev-button", Button);
Vue.component("ev-textarea", Textarea);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
