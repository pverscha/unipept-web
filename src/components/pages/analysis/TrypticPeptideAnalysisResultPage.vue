<template>
    <v-row>
        <v-col :cols="12">
            <SinglePeptideSummaryWrapper
                class="mt-5"
                :peptide="$route.params.sequence"
                :equateIl="equate($route.query.equate)"
            />
<!--            <single-peptide-analysis-card                                           -->
<!--                class="mt-5"                                            -->
<!--                :peptide="$route.params.sequence"                                           -->
<!--                :equateIl="$route.query.equate"                                         -->
<!--                :communication-source="communicationSource">                                            -->
<!--            </single-peptide-analysis-card>                                         -->
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import SinglePeptideSummaryWrapper from "../../wrappers/SinglePeptideSummaryWrapper.vue";

const equate = (equate: string | (string | null)[]): boolean => {
    if(equate === "true") {
        return true;
    }
    return false;
}
</script>
