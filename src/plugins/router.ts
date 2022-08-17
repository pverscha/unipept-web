import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "@/components/pages/HomePage.vue";
import NewsPage from "@/components/pages/NewsPage.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: HomePage
    },
    {
        path: "/posts",
        component: NewsPage
    }
];

export default new VueRouter({
    routes
});
