import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "@/components/pages/HomePage";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: HomePage
    }
];

export default new VueRouter({
    routes
});
