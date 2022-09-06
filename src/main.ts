import Vue from "vue"
import App from "./App.vue"
import vuetify from "./plugins/vuetify"
import router from "./plugins/router"
import pinia from "./plugins/pinia"
import componentStore from "./plugins/componentStore";

Vue.config.productionTip = false

new Vue({
    // @ts-ignore
    vuetify,
    router,
    pinia,
    store:componentStore,
    render: h => h(App)
}).$mount("#app")
