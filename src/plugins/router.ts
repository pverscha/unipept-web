import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "@/components/pages/HomePage.vue";
import NewsPage from "@/components/pages/NewsPage.vue";
import TrypticPeptideAnalysisPage from "@/components/pages/features/TrypticPeptideAnalysisPage.vue";
import MetaproteomeAnalysisPage from "@/components/pages/features/MetaproteomeAnalysisPage.vue";
import APIPage from "@/components/pages/features/APIPage.vue";
import CLIPage from "@/components/pages/features/CLIPage.vue";
import MetagenomicsPage from "@/components/pages/features/MetagenomicsPage.vue";
import DesktopPage from "@/components/pages/features/DesktopPage.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: HomePage
    },
    {
        path: "/tpa",
        component: TrypticPeptideAnalysisPage
    },
    {
        path: "/mpa",
        component: MetaproteomeAnalysisPage
    },
    {
        path: "/apidocs",
        component: APIPage
    },
    {
        path: "/clidocs",
        component: CLIPage
    },
    {
        path: "/umgap",
        component: MetagenomicsPage
    },
    {
        path: "/desktop",
        component: DesktopPage
    },
    {
        path: "/posts",
        component: NewsPage
    },
];

export default new VueRouter({
    routes
});
