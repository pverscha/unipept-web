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
    CaseStudiesPage as CLICaseStudiesPage,
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

// Metagenomics Documentation
import {
    OverviewPage as MetagenomicsOverviewPage,
    CaseStudiesPage as MetagenomicsCaseStudiesPage,
    PreconfiguredPage as MetagenomicsPreconfiguredPage,
    AdvancedPage as MetagenomicsAdvancedPage,
    ComparativePage as MetagenomicsComparativePage,
    Fastq2FastaPage as MetagenomicsFastq2FastaPage,
    TranslatePage as MetagenomicsTranslatePage,
    Prot2TrypPage as MetagenomicsProt2TrypPage,
    Prot2KmerPage as MetagenomicsProt2KmerPage,
    FilterPage as MetagenomicsFilterPage,
    Pept2LcaPage as MetagenomicsPept2LcaPage,
    Prot2Tryp2LcaPage as MetagenomicsProt2Tryp2LcaPage,
    Prot2Kmer2LcaPage as MetagenomicsProt2Kmer2LcaPage,
    BestofPage as MetagenomicsBestofPage,
    SeedExtendPage as MetagenomicsSeedExtendPage,
    UniqPage as MetagenomicsUniqPage,
    Taxa2AggPage as MetagenomicsTaxa2AggPage,
    SnapTaxonPage as MetagenomicsSnapTaxonPage,
    Taxa2FreqPage as MetagenomicsTaxa2FreqPage,
    Taxa2TreePage as MetagenomicsTaxa2TreePage,
    TaxonomyPage as MetagenomicsTaxonomyPage,
    SplitKmersPage as MetagenomicsSplitKmersPage,
    JoinKmersPage as MetagenomicsJoinKmersPage,
    BuildIndexPage as MetagenomicsBuildIndexPage,
    PrintIndexPage as MetagenomicsPrintIndexPage
} from "@/components/pages/metagenomics"

// Desktop Documentation
import {
    DesktopOverviewPage as DesktopOverviewPage,
    DesktopHomeDocsPage as DesktopHomeDocsPage,
    DesktopSingleAssayAnalysisPage as DesktopSingleAssayAnalysisPage,
    DesktopInterAssayComparisonPage as DesktopInterAssayComparisonPage,
} from "@/components/pages/desktopdocs";
import DesktopApplicationOverviewPage from "@/components/pages/desktopdocs/DesktopApplicationOverviewPage.vue";

Vue.use(VueRouter);

const apidocsMeta = {
    publication: "Mesuere et al. (2016) Bioinformatics",
    publicationLink: "doi:10.1093/bioinformatics/btw039"
};

const clidocsMeta = {
    publication: "Verschaffelt et al. (2020) Bioinformatics",
    publicationLink: "doi.org/10.1093/bioinformatics/btaa553"
};

const metagenomicsMeta = {
    publication: "Gurdeep Singh et al. (2019) Journal of Proteome Research",
    publicationLink: "doi:10.1021/acs.jproteome.8b00716"
};

const desktopMeta = {
    publication: "Verschaffelt et al. (2021) Journal of Proteome Research",
    publicationLink: "doi.org/10.1021/acs.jproteome.0c00855"
}

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
            { path: "casestudies", component: CLICaseStudiesPage, meta: clidocsMeta },
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
        children: [
            { path: "", component: MetagenomicsOverviewPage, meta: metagenomicsMeta },
            { path: "casestudies", component: MetagenomicsCaseStudiesPage, meta: metagenomicsMeta },
            { path: "casestudies/basic", component: MetagenomicsPreconfiguredPage, meta: metagenomicsMeta },
            { path: "casestudies/advanced", component: MetagenomicsAdvancedPage, meta: metagenomicsMeta },
            { path: "casestudies/comparative", component: MetagenomicsComparativePage, meta: metagenomicsMeta },
            { path: "fastq2fasta", component: MetagenomicsFastq2FastaPage, meta: metagenomicsMeta },
            { path: "translate", component: MetagenomicsTranslatePage, meta: metagenomicsMeta },
            { path: "prot2tryp", component: MetagenomicsProt2TrypPage, meta: metagenomicsMeta },
            { path: "prot2kmer", component: MetagenomicsProt2KmerPage, meta: metagenomicsMeta },
            { path: "filter", component: MetagenomicsFilterPage, meta: metagenomicsMeta },
            { path: "pept2lca", component: MetagenomicsPept2LcaPage, meta: metagenomicsMeta },
            { path: "prot2tryp2lca", component: MetagenomicsProt2Tryp2LcaPage, meta: metagenomicsMeta },
            { path: "prot2kmer2lca", component: MetagenomicsProt2Kmer2LcaPage, meta: metagenomicsMeta },
            { path: "bestof", component: MetagenomicsBestofPage, meta: metagenomicsMeta },
            { path: "seedextend", component: MetagenomicsSeedExtendPage, meta: metagenomicsMeta },
            { path: "uniq", component: MetagenomicsUniqPage, meta: metagenomicsMeta },
            { path: "taxa2agg", component: MetagenomicsTaxa2AggPage, meta: metagenomicsMeta },
            { path: "snaptaxon", component: MetagenomicsSnapTaxonPage, meta: metagenomicsMeta },
            { path: "taxa2freq", component: MetagenomicsTaxa2FreqPage, meta: metagenomicsMeta },
            { path: "taxa2tree", component: MetagenomicsTaxa2TreePage, meta: metagenomicsMeta },
            { path: "taxonomy", component: MetagenomicsTaxonomyPage, meta: metagenomicsMeta },
            { path: "splitkmers", component: MetagenomicsSplitKmersPage, meta: metagenomicsMeta },
            { path: "joinkmers", component: MetagenomicsJoinKmersPage, meta: metagenomicsMeta },
            { path: "buildindex", component: MetagenomicsBuildIndexPage, meta: metagenomicsMeta },
            { path: "printindex", component: MetagenomicsPrintIndexPage, meta: metagenomicsMeta }
        ],
        meta: metagenomicsMeta
    },
    {
        path: "/desktop",
        component: DesktopPage,
        children: [
            { path: "", component: DesktopOverviewPage, meta: desktopMeta },
            { path: "application-overview", component: DesktopApplicationOverviewPage, meta: desktopMeta },
            { path: "home", component: DesktopHomeDocsPage, meta: desktopMeta },
            { path: "single-assay-analysis", component: DesktopSingleAssayAnalysisPage, meta: desktopMeta },
            { path: "inter-assay-comparative-analysis", component: DesktopInterAssayComparisonPage, meta: desktopMeta },
        ],
        meta: desktopMeta
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
    routes,
    mode: "history",
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            // Go to appended anchor in the url
            return {
                selector: to.hash,
                behavior: "smooth"
            }
        } else if (savedPosition) {
            // Go to a saved location (history)
            return savedPosition;
        } else {
            // Go to the top of the page
            return { x: 0, y: 0 }
        }
    }
});
