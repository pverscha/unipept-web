<template>
    <div class="mt-5">
        <v-row>
            <v-col cols=6>
                <SelectDatasetCard style="min-height: 100%;" />
            </v-col>
            <v-col cols=6>
                <LoadDatasetsCard style="min-height: 100%;" />
            </v-col>
        </v-row>
    </div>
</template>

<script setup lang="ts">
import LoadDatasetsCard from '@/components/cards/analysis/multi/LoadDatasetsCard.vue';
import SelectDatasetCard from '@/components/cards/analysis/multi/SelectDatasetCard.vue';
</script>
