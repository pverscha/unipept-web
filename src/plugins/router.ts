import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "@/components/pages/HomePage.vue";
import AboutPage from "@/components/pages/AboutPage.vue";
import NewsPage from "@/components/pages/NewsPage.vue";
import TrypticPeptideAnalysisPage from "@/components/pages/features/TrypticPeptideAnalysisPage.vue";
import MetaproteomeAnalysisPage from "@/components/pages/features/MetaproteomeAnalysisPage.vue";
import APIPage from "@/components/pages/features/APIPage.vue";
import CLIPage from "@/components/pages/features/CLIPage.vue";
import MetagenomicsPage from "@/components/pages/features/MetagenomicsPage.vue";
import DesktopPage from "@/components/pages/features/DesktopPage.vue";

// API Documentation
import Pept2ProtPage from "@/components/pages/apidocs/Pept2ProtPage.vue";
import Pept2TaxaPage from "@/components/pages/apidocs/Pept2TaxaPage.vue";
import Pept2LcaPage from "@/components/pages/apidocs/Pept2LcaPage.vue";
import Pept2EcPage from "@/components/pages/apidocs/Pept2EcPage.vue";
import Pept2GoPage from "@/components/pages/apidocs/Pept2GoPage.vue";
import Pept2InterproPage from "@/components/pages/apidocs/Pept2InterproPage.vue";
import Pept2FunctPage from "@/components/pages/apidocs/Pept2Page.vue";
import Pept2InfoPage from "@/components/pages/apidocs/Pept2InfoPage.vue";
import Taxa2LcaPage from "@/components/pages/apidocs/Taxa2LcaPage.vue";
import Taxa2TreePage from "@/components/pages/apidocs/Taxa2TreePage.vue";
import TaxonomyPage from "@/components/pages/apidocs/TaxonomyPage.vue";

// News Documentation
import NewsOverviewPage from "@/components/pages/news/NewsOverviewPage.vue";
import APINewsPage from "@/components/pages/news/APINewsPage.vue";
import CLINewsPage from "@/components/pages/news/CLINewsPage.vue";
import WebNewsPage from "@/components/pages/news/WebNewsPage.vue";
import DesktopNewsPage from "@/components/pages/news/DesktopNewsPage.vue";

Vue.use(VueRouter);

const apidocsMeta = {
    publication: "Mesuere et al. (2016) Bioinformatics",
    publicationLink: "doi:10.1093/bioinformatics/btw039"
};

const newsMeta = {
    publication: "Gurdeep Singh et al. (2019) Journal of Proteome Research",
    publicationLink: "doi:10.1021/acs.jproteome.8b00716"
};

const routes = [
    {
        path: "/",
        component: HomePage,
        meta: {
            publication: "Gurdeep Singh et al. (2019) Journal of Proteome Research",
            publicationLink: "doi:10.1021/acs.jproteome.8b00716"
        }
    },
    {
        path: "/tpa",
        component: TrypticPeptideAnalysisPage,
        meta: {
            publication: "Gurdeep Singh et al. (2019) Journal of Proteome Research",
            publicationLink: "doi:10.1021/acs.jproteome.8b00716"
        }
    },
    {
        path: "/mpa",
        component: MetaproteomeAnalysisPage,
        meta: {
            publication: "Gurdeep Singh et al. (2019) Journal of Proteome Research",
            publicationLink: "doi:10.1021/acs.jproteome.8b00716"
        }
    },
    {
        path: "/apidocs",
        component: APIPage,
        children: [
            { path: "pept2prot", component: Pept2ProtPage, meta: apidocsMeta },
            { path: "pept2taxa", component: Pept2TaxaPage, meta: apidocsMeta },
            { path: "pept2lca", component: Pept2LcaPage, meta: apidocsMeta },
            { path: "pept2ec", component: Pept2EcPage, meta: apidocsMeta },
            { path: "pept2go", component: Pept2GoPage, meta: apidocsMeta },
            { path: "pept2interpro", component: Pept2InterproPage, meta: apidocsMeta },
            { path: "pept2funct", component: Pept2FunctPage, meta: apidocsMeta },
            { path: "pept2info", component: Pept2InfoPage, meta: apidocsMeta },
            { path: "taxa2lca", component: Taxa2LcaPage, meta: apidocsMeta },
            { path: "taxa2tree", component: Taxa2TreePage, meta: apidocsMeta },
            { path: "taxonomy", component: TaxonomyPage, meta: apidocsMeta },
        ],
        meta: apidocsMeta
    },
    {
        path: "/clidocs",
        component: CLIPage,
        meta: {
            publication: "Verschaffelt et al. (2020) Bioinformatics",
            publicationLink: "doi.org/10.1093/bioinformatics/btaa553"
        }
    },
    {
        path: "/umgap",
        component: MetagenomicsPage,
        meta: {
            publication: "Gurdeep Singh et al. (2019) Journal of Proteome Research",
            publicationLink: "doi:10.1021/acs.jproteome.8b00716"
        }
    },
    {
        path: "/desktop",
        component: DesktopPage,
        meta: {
            publication: "Verschaffelt et al. (2021) Journal of Proteome Research",
            publicationLink: "doi.org/10.1021/acs.jproteome.0c00855"
        }
    },
    {
        path: "/about",
        component: AboutPage,
        meta: {
            publication: "Gurdeep Singh et al. (2019) Journal of Proteome Research",
            publicationLink: "doi:10.1021/acs.jproteome.8b00716"
        }
    },
    {
        path: "/news",
        component: NewsPage,
        children: [
            { path: "", component: NewsOverviewPage, meta: newsMeta },
            { path: "api", component: APINewsPage, meta: newsMeta },
            { path: "cli", component: CLINewsPage, meta: newsMeta },
            { path: "web", component: WebNewsPage, meta: newsMeta },
            { path: "desktop", component: DesktopNewsPage, meta: newsMeta },
        ],
        meta: newsMeta
    },
];

export default new VueRouter({
    routes
});
