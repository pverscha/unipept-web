<template>
    <div>
        <tooltip message="Download a CSV-file with the results of this analysis.">
            <v-menu offset-y bottom left origin="top right">
                <template v-slot:activator="{ on }">
                    <v-btn min-width="187" :disabled="assayStatus.analysisInProgress || exportLoading" v-on="on" color="default">
                        <div v-if="!exportLoading">
                            <v-icon>
                                mdi-download
                            </v-icon>
                            {{ buttonText }}
                            <v-icon>mdi-menu-down</v-icon>
                        </div>
                        <v-progress-circular v-else indeterminate color="black" :size="20">
                        </v-progress-circular>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item @click="downloadCsv()">
                        <v-list-item-title>Comma-separated (international)</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="downloadCsv(';', ',')">
                        <v-list-item-title>Semi-colon-separated (Europe)</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="downloadCsv('\t', ';')">
                        <v-list-item-title>Tab-separated</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </tooltip>
    </div>
</template>

<script setup lang="ts">
import { MultiProteomicsAnalysisStatus, PeptideUtils, Tooltip, useCsvDownload } from 'unipept-web-components';
import { ref } from 'vue';

export interface Props {
    assayStatus: MultiProteomicsAnalysisStatus;

    buttonText: string
}

// eslint-disable-next-line
const props = defineProps<Props>();

const exportLoading = ref<boolean>(false);

const { downloadString } = useCsvDownload();

const downloadCsv = (separator = ',', functionalSeparator = ';') => {
    if(!props.assayStatus.analysisInProgress) {
        exportLoading.value = true;

        const csvString = PeptideUtils.exportAsCsv(
            props.assayStatus.data.peptideCountTable,
            props.assayStatus.pept2Data,
            props.assayStatus.goOntology,
            props.assayStatus.ecOntology,
            props.assayStatus.interproOntology,
            props.assayStatus.ncbiOntology,
            separator,
            functionalSeparator
        );
        downloadString(csvString, `${props.assayStatus.assay.name}_mpa.csv`);

        exportLoading.value = false;
    }
};
</script>
