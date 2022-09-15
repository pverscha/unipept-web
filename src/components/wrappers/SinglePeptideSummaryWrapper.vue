<template>
    <single-peptide-summary class="mt-5" :assay="analysisStore.assay" />
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { SinglePeptideSummary } from 'unipept-web-components';
import { useSingleAnalysis } from '@/stores';

export interface Props {
    peptide: string
    equateIl: boolean
}

const { peptide, equateIl } = defineProps<Props>();

const analysisStore = useSingleAnalysis();

analysisStore.analyse(peptide, equateIl);
</script>
