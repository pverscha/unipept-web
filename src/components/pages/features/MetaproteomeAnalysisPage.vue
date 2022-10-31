<template>
    <div class="mt-5">
        <v-row>
            <v-col cols=6>
                <SelectDatasetCard v-if="selector"
                    style="min-height: 100%;"
                    @search="search"
                />
                <SwitchDatasetCard v-else
                    style="min-height: 100%;"
                    :assaySelectionInProgress="true" 
                />
            </v-col>
            <v-col cols=6>
                <LoadDatasetsCard v-if="!displaySummary"
                    style="min-height: 100%;" 
                />
                <AnalysisSummaryCard v-else style="min-height: 100%;" />
            </v-col>
        </v-row>

        <v-row v-if="multiAnalysisStore.activeAssayStatus">
            <v-col cols=12>
                <VisualizationOverview
                    :analysisInProgress="!multiAnalysisStore.analysisCompleted(multiAnalysisStore.activeAssayStatus.assay.id)"
                    :ecTree="ecTree"
                    :taxaTree="multiAnalysisStore.activeAssayStatus?.data?.tree"
                    :goCountTableProcessor="multiAnalysisStore.activeAssayStatus?.data?.goCountTableProcessor"
                    :goOntology="multiAnalysisStore.activeAssayStatus?.goOntology" 
                    :ecCountTableProcessor="multiAnalysisStore.activeAssayStatus?.data?.ecCountTableProcessor"
                    :ecOntology="multiAnalysisStore.activeAssayStatus?.ecOntology"
                    :interproCountTableProcessor="multiAnalysisStore.activeAssayStatus?.data?.interproCountTableProcessor"
                    :interproOntology="multiAnalysisStore.activeAssayStatus?.interproOntology"
                    :ncbiCountTableProcessor="multiAnalysisStore.activeAssayStatus?.data?.lcaCountTableProcessor"
                    :ncbiOntology="multiAnalysisStore.activeAssayStatus?.ncbiOntology"
                    :ncbiTree="multiAnalysisStore.activeAssayStatus?.data?.tree"
                />
            </v-col>

            <v-col cols=12>
                <v-card>
                    <v-tabs 
                        slider-color="secondary" 
                        background-color="primary" 
                        dark 
                        v-model="currentTab"
                    >
                        <v-tab>GO terms</v-tab>
                        <v-tab>EC numbers</v-tab>
                        <v-tab>Interpro</v-tab>
                        <v-spacer/>
                        <v-menu close-on-content-click bottom left ref="sortMenu">
                            <template v-slot:activator="{ on }">
                                <v-btn text class="align-self-center mr-4" v-on="on">
                                    <v-icon left>mdi-sort-descending</v-icon>
                                    {{ sortPeptidePercentage ? 'Peptides %' : 'Peptides' }}
                                    <v-icon right>mdi-menu-down</v-icon>
                                </v-btn>
                            </template>

                            <v-list class="grey lighten-3">
                                <v-list-item dense class="menu-header">
                                    <v-list-item-title>
                                        Sort by number of peptides in related proteins
                                        <SortingPeptidesModal />
                                    </v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="sortPeptidePercentage = true">
                                    <v-list-item-title>
                                        Peptides %
                                    </v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="sortPeptidePercentage = false">
                                    <v-list-item-title>
                                        Peptides
                                    </v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-tabs>

                    <v-tabs-items class="mb-5" v-model="currentTab">
                        <v-tab-item>
                            <GoSummaryCard
                                :analysisInProgress="!multiAnalysisStore.analysisCompleted(multiAnalysisStore.activeAssayStatus.assay.id)"
                                :goProcessor="multiAnalysisStore.activeAssayStatus.data?.goCountTableProcessor"
                                :goOntology="multiAnalysisStore.activeAssayStatus?.goOntology"
                                :showPercentage="sortPeptidePercentage"
                            />
                        </v-tab-item>
                        <v-tab-item>
                            <EcSummaryCard
                                :analysisInProgress="!multiAnalysisStore.analysisCompleted(multiAnalysisStore.activeAssayStatus.assay.id)"
                                :ecProcessor="multiAnalysisStore.activeAssayStatus.data?.ecCountTableProcessor"
                                :ecOntology="multiAnalysisStore.activeAssayStatus?.ecOntology"
                                :ecTree="ecTree"
                                :showPercentage="sortPeptidePercentage"
                            />
                        </v-tab-item>
                        <v-tab-item>
                            <InterproSummaryCard
                                :analysisInProgress="!multiAnalysisStore.analysisCompleted(multiAnalysisStore.activeAssayStatus.assay.id)"
                                :interproProcessor="multiAnalysisStore.activeAssayStatus.data?.interproCountTableProcessor"
                                :interproOntology="multiAnalysisStore.activeAssayStatus?.interproOntology"
                                :showPercentage="sortPeptidePercentage"
                            />
                        </v-tab-item>
                    </v-tabs-items>
                </v-card>
            </v-col>
        </v-row>

        <v-row v-else class="search-info">
            <v-col class="info-step">
                <h2>Select samples</h2>
                <p>
                    Make a selection of samples that should be analysed. New samples can be added by pasting a peptide list, or existing samples can be reused.
                </p>
                </v-col>
                <v-col class="info-step">
                <h2>Click search</h2>
                <p>
                    Review the search settings for peptide deduplication, advanced missed cleavage handling and equating isoleucine and leucine before clicking search.
                </p>
                </v-col>
                <v-col class="info-step">
                <h2>Gain insight</h2>
                <p>
                    For each of the peptides, the lowest common ancestor (LCA) will be calculated, aggregated and visualised on the result page, giving you insight in the taxonomic diversity of your sample.
                </p>
            </v-col>
        </v-row>
    </div>
</template>

<script setup lang="ts">
import LoadDatasetsCard from '@/components/cards/analysis/multi/LoadDatasetsCard.vue';
import SelectDatasetCard from '@/components/cards/analysis/multi/SelectDatasetCard.vue';
import SwitchDatasetCard from '@/components/cards/analysis/multi/SwitchDatasetCard.vue';
import { computed, onUnmounted, ref } from 'vue';
import AnalysisSummaryCard from '@/components/cards/analysis/multi/AnalysisSummaryCard.vue';
import { GoSummaryCard, EcSummaryCard, InterproSummaryCard, computeEcTree, VisualizationOverview } from 'unipept-web-components';
import useMultiAnalysis from '@/stores/MultiAnalysisStore';
import SortingPeptidesModal from '@/components/modals/SortingPeptidesModal.vue';

const multiAnalysisStore = useMultiAnalysis();

const selector = ref<boolean>(true);
const displaySummary = ref<boolean>(false);
const sortPeptidePercentage = ref<boolean>(false);

const currentTab = ref<number>(0);

const search = () => {
    selector.value = false;
    displaySummary.value = true;
}

const ecTree = computed(() => {
    if(multiAnalysisStore.activeAssayStatus) {
        if(multiAnalysisStore.analysisCompleted(multiAnalysisStore.activeAssayStatus.assay.id)) {
            return computeEcTree(
                multiAnalysisStore.activeAssayStatus.data.ecCountTableProcessor.getCountTable(), 
                // @ts-ignore
                multiAnalysisStore.activeAssayStatus.ecOntology
            );
        }
    }

    return undefined;
})

onUnmounted(() => {
    selector.value = true;
    multiAnalysisStore.removeAllAssays();
    displaySummary.value = false;
    sortPeptidePercentage.value = false;
});
</script>

<style scoped>
.search-info {
    margin-top: 36px;
}

.info-step h2 {
    font-size: 24px;
}
.info-step p {
    font-size: 16px;
    font-weight: 300;
    line-height: 24px;
    margin-top: 16px;
}
</style>
