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
import {
    OverviewPage as APIOverviewPage,
    Pept2ProtPage as APIPept2ProtPage,
    Pept2TaxaPage as APIPept2TaxaPage,
    Pept2LcaPage as APIPept2LcaPage,
    Pept2EcPage as APIPept2EcPage,
    Pept2GoPage as APIPept2GoPage,
    Pept2InterproPage as APIPept2InterproPage,
    Pept2FunctPage as APIPept2FunctPage,
    PeptInfoPage as APIPeptInfoPage,
    Taxa2LcaPage as APITaxa2LcaPage,
    Taxa2TreePage as APITaxa2TreePage,
    TaxonomyPage as APITaxonomyPage
} from "@/components/pages/apidocs";

// CLI Documentation
import { 
    OverviewPage as CLIOverviewPage,
    CaseStudiesPage,
    CLITrypticPeptideAnalysisPage,
    CLIMetaproteomicsAnalysisPage,
    UniprotPage,
    Prot2PeptPage,
    PeptfilterPage,
    Pept2LcaPage as CLIPept2LcaPage,
    Pept2ProtPage as CLIPept2ProtPage,
    Pept2TaxaPage as CLIPept2TaxaPage,
    Pept2EcPage as CLIPept2EcPage,
    Pept2GoPage as CLIPept2GoPage,
    Pept2InterproPage as CLIPept2InterproPage,
    Pept2FunctPage as CLIPept2FunctPage,
    PeptInfoPage as CLIPeptInfoPage,
    Taxa2LcaPage as CLITaxa2LcaPage,
    Taxa2TreePage as CLITaxa2TreePage,
    TaxonomyPage as CLITaxonomyPage
} from "@/components/pages/clidocs";

Vue.use(VueRouter);

const apidocsMeta = {
    publication: "Mesuere et al. (2016) Bioinformatics",
    publicationLink: "doi:10.1093/bioinformatics/btw039"
};

const clidocsMeta = {
    publication: "Verschaffelt et al. (2020) Bioinformatics",
    publicationLink: "doi.org/10.1093/bioinformatics/btaa553"
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
            { path: "", component: APIOverviewPage, meta: apidocsMeta },
            { path: "pept2prot", component: APIPept2ProtPage, meta: apidocsMeta },
            { path: "pept2taxa", component: APIPept2TaxaPage, meta: apidocsMeta },
            { path: "pept2lca", component: APIPept2LcaPage, meta: apidocsMeta },
            { path: "pept2ec", component: APIPept2EcPage, meta: apidocsMeta },
            { path: "pept2go", component: APIPept2GoPage, meta: apidocsMeta },
            { path: "pept2interpro", component: APIPept2InterproPage, meta: apidocsMeta },
            { path: "pept2funct", component: APIPept2FunctPage, meta: apidocsMeta },
            { path: "peptinfo", component: APIPeptInfoPage, meta: apidocsMeta },
            { path: "taxa2lca", component: APITaxa2LcaPage, meta: apidocsMeta },
            { path: "taxa2tree", component: APITaxa2TreePage, meta: apidocsMeta },
            { path: "taxonomy", component: APITaxonomyPage, meta: apidocsMeta },
        ],
        meta: apidocsMeta
    },
    {
        path: "/clidocs",
        component: CLIPage,
        children: [
            { path: "", component: CLIOverviewPage, meta: clidocsMeta },
            { path: "casestudies", component: CaseStudiesPage, meta: clidocsMeta },
            { path: "casestudies/tpa", component: CLITrypticPeptideAnalysisPage, meta: clidocsMeta },
            { path: "casestudies/mpa", component: CLIMetaproteomicsAnalysisPage, meta: clidocsMeta },
            { path: "uniprot", component: UniprotPage, meta: clidocsMeta },
            { path: "prot2pept", component: Prot2PeptPage, meta: clidocsMeta },
            { path: "peptfilter", component: PeptfilterPage, meta: clidocsMeta },
            { path: "pept2lca", component: CLIPept2LcaPage, meta: clidocsMeta },
            { path: "pept2prot", component: CLIPept2ProtPage, meta: clidocsMeta },
            { path: "pept2taxa", component: CLIPept2TaxaPage, meta: clidocsMeta },
            { path: "pept2ec", component: CLIPept2EcPage, meta: clidocsMeta },
            { path: "pept2go", component: CLIPept2GoPage, meta: clidocsMeta },
            { path: "pept2interpro", component: CLIPept2InterproPage, meta: clidocsMeta },
            { path: "pept2funct", component: CLIPept2FunctPage, meta: clidocsMeta },
            { path: "peptinfo", component: CLIPeptInfoPage, meta: clidocsMeta },
            { path: "taxa2lca", component: CLITaxa2LcaPage, meta: clidocsMeta },
            { path: "taxa2tree", component: CLITaxa2TreePage, meta: clidocsMeta },
            { path: "taxonomy", component: CLITaxonomyPage, meta: clidocsMeta }
        ],
        meta: clidocsMeta
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
        path: "/posts",
        component: NewsPage,
        meta: {
            publication: "Gurdeep Singh et al. (2019) Journal of Proteome Research",
            publicationLink: "doi:10.1021/acs.jproteome.8b00716"
        }
    },
];

export default new VueRouter({
    routes
});
