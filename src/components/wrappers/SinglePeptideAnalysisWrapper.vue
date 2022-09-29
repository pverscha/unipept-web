<template>
    <div>
        <single-peptide-summary class="my-5" :assay="analysisStore.assay" />
        <single-peptide-analysis :assay="analysisStore.assay" />
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { SinglePeptideSummary, SinglePeptideAnalysis } from 'unipept-web-components';
import { useSingleAnalysis } from '@/stores';

export interface Props {
    peptide: string
    equateIl: boolean
}

const { peptide, equateIl } = defineProps<Props>();

const analysisStore = useSingleAnalysis();

analysisStore.analyse(peptide, equateIl);
</script>
