<template>
    <v-container>
        <v-container class="main">
            <v-row>
                <v-col class="col-lg-6 col-sm-12">
                    <div class="text-h3 font-weight-light mb-2">Welcome</div>
                    Unipept is an open source web application developed at <a href="https://www.ugent.be/en" target="_blank">Ghent University</a> that is designed for metaproteomics 
                    data analysis with a focus on <span class="font-weight-bold">interactive datavisualizations</span>. Unipept is powered by an index containing all 
                    UniProt entries, a tweaked version of the NCBI taxonomy and a custom lowest common ancestor algorithm. This combination enables a blazingly fast 
                    <span class="font-weight-bold">biodiversity analysis</span> of large and complex <span class="font-weight-bold">metaproteome samples</span>. 
                    This functionality is also available via an API and a set of command line tools. Next to these core functions, Unipept also has a tool for 
                    selecting unique peptides for <span class="font-weight-bold">targeted proteomics</span> and for <span class="font-weight-bold">comparing 
                    genomes</span> based on peptide similarity.
                </v-col>
                <v-col class="col-lg-6 col-sm-12">
                    <v-card>
                        <v-list-item two-line class="blue darken-1">
                            <v-list-item-content>
                                <v-list-item-title class="text-h5 white--text">
                                    Unipept 4.3
                                </v-list-item-title>
                                <v-list-item-subtitle class="white--text">posted on 2020-04-15</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-card-text>
                            Unipept 4.3 has just been released and contains these major additions:
                            <ul>
                                <li>
                                    Load and process multiple samples at once with the metaproteomics analysis tool.
                                </li>
                                <li>
                                    Compare multiple samples with each other using the new heatmap.
                                </li>
                                <li>
                                    Functional analysis has been expanded with support for InterPro annotations.
                                </li>
                                <li>
                                    UniProt updated to version 2020.01
                                </li>
                            </ul>
                        </v-card-text>

                        <v-divider class="mx-4"></v-divider>

                        <v-card-actions>
                            <v-spacer />
                            <router-link
                                to="/posts"
                                v-slot="{ href, navigate }"
                            >
                                <v-btn
                                    color="secondary"
                                    text
                                    @click="navigate"
                                    :href="href"
                                >
                                    More news
                                </v-btn>
                            </router-link>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <!-- Tryptic Peptide Analysis -->
                <v-col class="col-lg-4 col-md-6">
                    <router-link to="/tpa">
                        <v-hover>
                            <template v-slot:default="{ hover }">
                                <HomePageCard :hover="hover" title="Tryptic Peptide Analysis" :asset="require('@/assets/home-feature-single.png')">
                                    With tryptic peptide analysis, you can submit a single <span class='font-weight-bold'>tryptic peptide</span> that can be 5 
                                    to 50 residues long. The application will respond with a list of <span class='font-weight-bold'>all Uniprot entries</span> 
                                    wherein the peptide was found along with a complete taxonomic lineage derived from the NCBI taxonomy. These lineages are 
                                    presented as a comprehensible table and using an interactive tree view.
                                </HomePageCard>
                            </template>
                        </v-hover>
                    </router-link>
                </v-col>

                <!-- Metaproteomics Analysis -->
                <v-col class="col-lg-4 col-md-6">
                    <router-link to="/mpa">
                        <v-hover>
                            <template v-slot:default="{ hover }">
                                <HomePageCard :hover="hover" title="Metaproteomics Analysis" :asset="require('@/assets/home-feature-multi.svg')">
                                    Metaproteomics analysis helps you analyze <span class='font-weight-bold'>lists of tryptic peptides</span>, e.g. 
                                    extracted from an environmental sample using shotgun tandem mass spectrometric methods. Of these peptides, the 
                                    lowest common ancestors (LCA) will be calculated. These LCAs will be bundled and displayed in an interactive treemap 
                                    giving you insight into the <span class='font-weight-bold'>biodiversity of your sample</span>.
                                </HomePageCard>
                            </template>
                        </v-hover>
                    </router-link>
                </v-col>

                <!-- Unipept Desktop -->
                <v-col class="col-lg-4 col-md-6">
                    <router-link to="/desktop">
                        <v-hover>
                            <template v-slot:default="{ hover }">
                                <HomePageCard :hover="hover" title="Unipept Desktop" :asset="require('@/assets/home-feature-desktop.png')">
                                    The Unipept Desktop application allows to analyse larger samples, to store analysis results offline, to extensively 
                                    compare assays with each other and to better manage samples. This application is powered by the Electron framework and 
                                    runs on almost all systems. This allows you to improve the understanding of all interactions that are taking place in a 
                                    complex environment.
                                </HomePageCard>
                            </template>
                        </v-hover>
                    </router-link>
                </v-col>

                <!-- API Documentation -->
                <v-col class="col-lg-4 col-md-6">
                    <router-link to="/apidocs">
                        <v-hover>
                            <template v-slot:default="{ hover }">
                                <HomePageCard :hover="hover" title="API Documentation" :asset="require('@/assets/home-feature-api.svg')">
                                    Unipept offers most of its peptide analysis features as a <span class='font-weight-bold'>web service</span>. This enables 
                                    the integration of Unipept functionality into other applications and the creation of batch processing scripts. These 
                                    <span class='font-weight-bold'>documentation pages</span> describe the available features of the API, how to access them and 
                                    plenty examples.
                                </HomePageCard>
                            </template>
                        </v-hover>
                    </router-link>
                </v-col>

                <!-- CLI Documentation -->
                <v-col class="col-lg-4 col-md-6">
                    <router-link to="/clidocs">
                        <v-hover>
                            <template v-slot:default="{ hover }">
                                <HomePageCard :hover="hover" title="CLI Documentation" :asset="require('@/assets/home-feature-cli.svg')">
                                    The Unipept <span class='font-weight-bold'>command line interface</span> (CLI) is a wrapper around the Unipept API that 
                                    offers an easy way to <span class='font-weight-bold'>integrate Unipept</span> functionality into your data processing 
                                    <span class='font-weight-bold'>pipelines and scripts</span>. These pages cover installation and usage instructions, an 
                                    overview of all available options and several use cases.
                                </HomePageCard>
                            </template>
                        </v-hover>
                    </router-link>
                </v-col>

                <!-- Metagenomics Analysis -->
                <v-col class="col-lg-4 col-md-6">
                    <router-link to="/umgap">
                        <v-hover>
                            <template v-slot:default="{ hover }">
                                <HomePageCard :hover="hover" title="UMGAP" :asset="require('@/assets/home-feature-umgap.svg')">
                                    Use the Unipept MetaGenomics Analysis Pipeline to assign taxonomic labels to your <span class='font-weight-bold'>shotgun 
                                    metagenomics reads</span>. The results are available as taxonomic frequency tables and interactive visualizations. UMGAP 
                                    is a collection of CLI tools that can be combined to identify shotgun metagenomics reads.
                                </HomePageCard>
                            </template>
                        </v-hover>
                    </router-link>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HomePageCard from "../cards/HomePageCard.vue";

export default defineComponent({
    name: "HomePage",
    setup() { },
    components: { HomePageCard },
});
</script>

<style scoped>
    .main {
        width: 75%;
    }

    a {
        text-decoration: none;
    }
</style>
