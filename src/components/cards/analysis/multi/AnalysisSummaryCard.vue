<template>
    <v-card class="d-flex flex-column flex-grow-1">
        <v-tabs
            class="flex-grow-0"
            style="pointer-events: none;"
            slider-color="primary"
            background-color="primary"
            dark
        >
            <v-tab>Analysis summary</v-tab>
        </v-tabs>

        <v-card-text style="flex-grow: 1; display: flex; flex-direction: column;">
            <div v-if="!multiAnalysisStore.activeAssayStatus">
                <v-alert type="error">
                    There currently is no active assay. Please select one from the list on the left or add a new assay.
                </v-alert>
            </div>

            <div v-else-if="loading" style="display: flex; justify-content: center;">
                <v-progress-circular indeterminate color="primary" />
            </div>

            <div v-else>
                <div class="subtitle-1">Peptide list</div>
                <v-textarea 
                    v-model="peptides"
                    :readonly="true"
                />

                <div class="subtitle-1">Search settings</div>

                <div class="d-flex">
                    <v-switch class="pt-0 mt-0" v-model="equateIl" inset dense />
                    <Tooltip message="Equate isoleucine (I) and leucine (L) when matching peptides to UniProt entries.">
                        <span>Equate I and L</span>
                    </Tooltip>
                </div>

                <div class="d-flex mt-n2">
                    <v-switch class="pt-0 mt-0" v-model="filterDuplicates" inset dense />
                    <Tooltip message="Remove duplicate peptides from the input before searching.">
                        <span>Filter duplicate peptides</span>
                    </Tooltip>
                </div>

                <div class="d-flex mt-n2">
                    <v-switch class="pt-0 mt-0" v-model="cleavageHandling" inset dense />
                    <Tooltip message="Recombine subpeptides of miscleavages. Enabling this has a serious performance impact!">
                        <span>Advanced missed cleavage handling</span>
                    </Tooltip>
                </div>

                <div class="card-actions d-flex flex-wrap">
                    <tooltip message="Restart search with selected samples using the settings chosen above.">
                        <v-btn class="mr-3" :disabled="false" @click="reprocess()" color="primary">
                            <v-icon left>
                                mdi-restore
                            </v-icon>
                            Update
                        </v-btn>
                    </tooltip>

                    <PeptideExportButton
                        :assayStatus="multiAnalysisStore.activeAssayStatus"
                        buttonText="Download results"
                    />
                </div>

                <div v-if="multiAnalysisStore.activeAssayStatus.filteredData">
                    <v-divider class="my-3"></v-divider>

                    <span class="peptide-match-text">
                        We managed to match {{ multiAnalysisStore.activeAssayStatus.filteredData.trust.matchedPeptides }} of your 
                        {{ multiAnalysisStore.activeAssayStatus.filteredData.trust.searchedPeptides }} peptides. Unfortunately,
                        <a style="cursor: pointer;" @click="showMissedPeptides = true">
                            {{ multiAnalysisStore.activeAssayStatus.filteredData.trust.missedPeptides.length }}
                        </a>
                        peptides couldn't be found.
                    </span>
                </div>

                <v-dialog v-model="showMissedPeptides" :width="600" scrollable>
                    <MissingPeptidesModal :missedPeptides="multiAnalysisStore.activeAssayStatus.filteredData.trust.missedPeptides" />
                </v-dialog>
            </div>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import useMultiAnalysis from '@/stores/MultiAnalysisStore';
import { computed, ref } from 'vue';
import { Tooltip } from 'unipept-web-components';
import MissingPeptidesModal from '@/components/modals/MissingPeptidesModal.vue';
import PeptideExportButton from '@/components/buttons/PeptideExportButton.vue';

const multiAnalysisStore = useMultiAnalysis();

const equateIl = ref<boolean>(multiAnalysisStore.activeAssayStatus?.equateIl!);
const filterDuplicates = ref<boolean>(multiAnalysisStore.activeAssayStatus?.filterDuplicates!);
const cleavageHandling = ref<boolean>(multiAnalysisStore.activeAssayStatus?.cleavageHandling!);

const loading = ref<boolean>(false);

const showMissedPeptides = ref<boolean>(false);

const peptides = computed(() => {
    if(!multiAnalysisStore.activeAssayStatus) {
        return "";
    }

    return multiAnalysisStore.activeAssayStatus.assay.peptides.join('\n');
});

const reprocess = () => {
    multiAnalysisStore.analyse(
        multiAnalysisStore.activeAssayStatus?.assay!, 
        equateIl.value, filterDuplicates.value, cleavageHandling.value
    )
}

// Loading workaround
multiAnalysisStore.$subscribe((mutation, state) => {
    loading.value = state.activeAssayStatus?.analysisInProgress!;
});
</script>
