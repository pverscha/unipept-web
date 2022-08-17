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
                            <v-list>
                                <v-list-item>
                                    Load and process multiple samples at once with the metaproteomics analysis tool.
                                </v-list-item>
                                <v-list-item>
                                    Compare multiple samples with each other using the new heatmap.
                                </v-list-item>
                                <v-list-item>
                                    Functional analysis has been expanded with support for InterPro annotations.
                                </v-list-item>
                                <v-list-item>
                                    UniProt updated to version 2020.01
                                </v-list-item>
                            </v-list>
                        </v-card-text>

                        <v-divider class="mx-4"></v-divider>

                        <v-card-actions>
                            <v-spacer />
                            <v-btn
                                color="secondary"
                                text
                                @click="reserve"
                            >
                                More news
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col v-for="(feature, index) in features" :key="index" class="col-lg-4 col-md-6">
                    <v-hover>
                        <template v-slot:default="{ hover }">
                            <v-card :elevation="hover ? 6 : 2">
                                <v-img
                                    height="250"
                                    :src="feature.asset"
                                    :alt="feature.asset"
                                />

                                <v-card-title class="m-n16">{{ feature.name }}</v-card-title>

                                <v-card-text>
                                    {{ feature.description }}
                                </v-card-text>
                            </v-card>
                        </template>
                    </v-hover>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "HomePage",
    setup() { },
    components: { },
    data() {
        return {
            features: [
                { 
                    name: "Tryptic Peptide Analysis", 
                    description: "With tryptic peptide analysis, you can submit a single tryptic peptide that can be 5 to 50 residues long. The application will respond with a list of all Uniprot entries wherein the peptide was found along with a complete taxonomic lineage derived from the NCBI taxonomy. These lineages are presented as a comprehensible table and using an interactive tree view.", 
                    asset: require("@/assets/home-feature-single.png") 
                },
                { 
                    name: "Metaproteome Analysis", 
                    description: "Metaproteomics analysis helps you analyze lists of tryptic peptides, e.g. extracted from an environmental sample using shotgun tandem mass spectrometric methods. Of these peptides, the lowest common ancestors (LCA) will be calculated. These LCAs will be bundled and displayed in an interactive treemap giving you insight into the biodiversity of your sample.", 
                    asset: require("@/assets/home-feature-multi.svg") 
                },
                { 
                    name: "Unipept Desktop", 
                    description: "The Unipept Desktop application allows to analyse larger samples, to store analysis results offline, to extensively compare assays with each other and to better manage samples. This application is powered by the Electron framework and runs on almost all systems. This allows you to improve the understanding of all interactions that are taking place in a complex environment.", 
                    asset: require("@/assets/home-feature-desktop.png") 
                },
                { 
                    name: "API Documentation", 
                    description: "Unipept offers most of its peptide analysis features as a web service. This enables the integration of Unipept functionality into other applications and the creation of batch processing scripts. These documentation pages describe the available features of the API, how to access them and plenty examples.", 
                    asset: require("@/assets/image-placeholder.jpg") 
                },
                { 
                    name: "CLI Documentation", 
                    description: "The Unipept command line interface (CLI) is a wrapper around the Unipept API that offers an easy way to integrate Unipept functionality into your data processing pipelines and scripts. These pages cover installation and usage instructions, an overview of all available options and several use cases.", 
                    asset: require("@/assets/image-placeholder.jpg") 
                },
                { 
                    name: "UMGAP", 
                    description: "Use the Unipept MetaGenomics Analysis Pipeline to assign taxonomic labels to your shotgun metagenomics reads. The results are available as taxonomic frequency tables and interactive visualizations. UMGAP is a collection of CLI tools that can be combined to identify shotgun metagenomics reads.", 
                    asset: require("@/assets/home-feature-umgap.svg") 
                }
            ]
        }
    }
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
