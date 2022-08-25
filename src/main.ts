import Vue from "vue"
import App from "./App.vue"
import vuetify from "./plugins/vuetify"
import router from "./plugins/router"
import VueHighlightJS from 'vue-highlightjs'

Vue.config.productionTip = false

Vue.use(VueHighlightJS);

new Vue({
    // @ts-ignore
    vuetify,
    router,
    render: h => h(App)
}).$mount("#app")
