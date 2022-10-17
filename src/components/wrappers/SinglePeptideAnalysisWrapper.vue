<template>
    <div>
        <single-peptide-summary class="my-5" :assay="analysisStore.assay" :toggleFullscreen="toggle" />
        <single-peptide-analysis :assay="analysisStore.assay" />
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { SinglePeptideSummary, SinglePeptideAnalysis } from 'unipept-web-components';
import { useSingleAnalysis } from '@/stores';
import { useFullscreen } from '@vueuse/core';

export interface Props {
    peptide: string
    equateIl: boolean
}

const { toggle } = useFullscreen()

const { peptide, equateIl } = defineProps<Props>();

const analysisStore = useSingleAnalysis();

analysisStore.analyse(peptide, equateIl);
</script>
