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
                    </v-tabs>

                    <v-tabs-items class="mb-5" v-model="currentTab">
                        <v-tab-item>
                            <GoSummaryCard
                                :analysisInProgress="!multiAnalysisStore.analysisCompleted(multiAnalysisStore.activeAssayStatus.assay.id)"
                                :goProcessor="multiAnalysisStore.activeAssayStatus.data?.goCountTableProcessor"
                                :goOntology="multiAnalysisStore.activeAssayStatus?.goOntology"
                            />
                        </v-tab-item>
                        <v-tab-item>
                            <EcSummaryCard
                                :analysisInProgress="!multiAnalysisStore.analysisCompleted(multiAnalysisStore.activeAssayStatus.assay.id)"
                                :ecProcessor="multiAnalysisStore.activeAssayStatus.data?.ecCountTableProcessor"
                                :ecOntology="multiAnalysisStore.activeAssayStatus?.ecOntology"
                                :ecTree="ecTree"
                            />
                        </v-tab-item>
                        <v-tab-item>
                            <InterproSummaryCard
                                :analysisInProgress="!multiAnalysisStore.analysisCompleted(multiAnalysisStore.activeAssayStatus.assay.id)"
                                :interproProcessor="multiAnalysisStore.activeAssayStatus.data?.interproCountTableProcessor"
                                :interproOntology="multiAnalysisStore.activeAssayStatus?.interproOntology"
                            />
                        </v-tab-item>
                    </v-tabs-items>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script setup lang="ts">
import LoadDatasetsCard from '@/components/cards/analysis/multi/LoadDatasetsCard.vue';
import SelectDatasetCard from '@/components/cards/analysis/multi/SelectDatasetCard.vue';
import SwitchDatasetCard from '@/components/cards/analysis/multi/SwitchDatasetCard.vue';
import { computed, ref } from 'vue';
import AnalysisSummaryCard from '@/components/cards/analysis/multi/AnalysisSummaryCard.vue';
import { GoSummaryCard, EcSummaryCard, InterproSummaryCard, computeEcTree, VisualizationOverview } from 'unipept-web-components';
import useMultiAnalysis from '@/stores/MultiAnalysisStore';

const multiAnalysisStore = useMultiAnalysis();

console.log(multiAnalysisStore)

const selector = ref<boolean>(true);
const displaySummary = ref<boolean>(false);

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
</script>
