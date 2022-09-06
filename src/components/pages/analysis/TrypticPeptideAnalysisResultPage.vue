<template>
    <v-row>
        <v-col :cols="12">
            <single-peptide-summary
                class="mt-5"
                :peptide="$route.params.sequence"
                :equateIl="$route.query.equate"
                :communication-source="communicationSource">
            </single-peptide-summary>
            <single-peptide-analysis-card
                class="mt-5"
                :peptide="$route.params.sequence"
                :equateIl="$route.query.equate"
                :communication-source="communicationSource">
            </single-peptide-analysis-card>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import {
    SinglePeptideAnalysisCard,
    SinglePeptideSummary,
    CommunicationSource,
    DefaultCommunicationSource
} from "unipept-web-components";

const communicationSource: CommunicationSource = new DefaultCommunicationSource("https://api.unipept.ugent.be");
</script>
