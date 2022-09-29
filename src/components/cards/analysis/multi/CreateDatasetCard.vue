<template>
    <v-card flat>
        <v-card-text>
            <v-form v-model="validForm" @submit="createAssay">
                <v-row class="my-1">
                    <v-col class="pb-0" cols=12>
                        <v-textarea
                            class="pt-0 mt-0"
                            v-model="peptideList"
                            label="Peptide list"
                            :rules="peptideListRules"
                            :spellcheck="false"
                            :rows="7"
                            clearable
                            no-resize
                        />
                    </v-col>
                </v-row>

                <Tooltip message="This name will be shown on the results page. Handy if you have many open tabs.">
                    <v-text-field
                        v-model="datasetName"
                        label="Name this dataset"
                        placeholder="e.g. Sample B5"
                        :rules="datasetNameRules"
                        clearable
                    />
                </Tooltip>

                <v-btn
                    class="text-center mt-2"
                    :disabled="!validForm"
                    type="submit"
                >
                    <v-icon left>mdi-plus</v-icon> Add to selected datasets
                </v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useAssays from '@/stores/AssayStore';
import { Tooltip } from "unipept-web-components";

const assayStore = useAssays();

const validForm = ref(false);
const peptideList = ref("");
const datasetName = ref("");

const peptideListRules = [
    (value: string) => !!value || 'At least one peptide is required'
];

const datasetNameRules = [
    (value: string) => !!value || 'Name is required when the dataset is set to be saved'
];

const createAssay = () => {
    const peptides = peptideList.value.split('\n');

    const assay = {
        name: datasetName.value,
        peptides: peptides,
        amountOfPeptides: peptides.length,
        createdAt: new Date()
    }

    assayStore.addLocalAssay(assay);
    assayStore.addSelectedAssay(assay);
}
</script>
