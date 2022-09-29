<template>
    <v-card flat>
        <v-card-text>
            <h3>Load data from the PRIDE archive</h3>
            <p>You can easily load data from the <a href="http://www.ebi.ac.uk/pride/" target="_blank">PRIDE</a> data repository. Simply enter an assay id (e.g. 8500) in the field below and click the 'Load PRIDE Dataset' button. The corresponding dataset will then be fetched using the PRIDE API and loaded into the search form on the left.</p>
            
            <v-form v-model="validInputForm" @submit="fetchPrideDataset">
                <v-text-field
                    v-model="prideId"
                    label="Assay id"
                    placeholder="e.g. 123909"
                    :disabled="loading"
                    :rules="prideInputRules"
                    @keyup.enter="fetchPrideDataset"
                />

                <v-btn
                    class="text-center mt-2"
                    :disabled="!validInputForm || loading"
                    type="submit"
                >
                    <v-icon left>mdi-cloud-download</v-icon> Fetch PRIDE dataset
                </v-btn>
            </v-form>
        </v-card-text>

        <v-divider />

        <v-card-text v-if="error" class="connection-error">
            <v-alert type="error">
               {{ error }}
            </v-alert>
        </v-card-text>

        <v-card-text v-else class="pt-0">
            <v-form v-model="validForm" @submit="createAssay">
                <v-row class="my-1">
                    <v-col class="pb-0" cols=12>
                        <v-textarea
                            class="pt-0 mt-0"
                            v-model="peptideList"
                            label="Peptide list"
                            :loading="loading"
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
                        placeholder="e.g. PRIDE assay 123909"
                        :loading="loading"
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
import useAssays from '@/stores/AssayStore';
import { ref } from 'vue';
import { Tooltip, PrideCommunicator, Peptide } from 'unipept-web-components';

const assayStore = useAssays();

const loading = ref<boolean>(false);
const error = ref<string>("");

const validInputForm = ref<boolean>(false);
const prideId = ref<string>("");

const validForm = ref(false);
const peptideList = ref("");
const datasetName = ref("");

const prideInputRules = [
    (value: string) => !!value || 'Please enter a valid PRIDE assay number'  
];

const peptideListRules = [
    (value: string) => !!value || 'At least one peptide is required'
];

const datasetNameRules = [
    (value: string) => !!value || 'Name is required when the dataset is set to be saved'
];

const fetchPrideDataset = () => {
    if(loading.value) {
        return;
    }

    loading.value = true;
    error.value = "";
    peptideList.value = "";

    datasetName.value = "PRIDE assay " + prideId.value;

    // @ts-ignore
    const communicator = new PrideCommunicator(process.env.VUE_APP_PRIDE_API_PEPTIDE_URL, process.env.VUE_APP_PRIDE_BATCH_SIZE);
    communicator.getPeptides(prideId.value)
        .then((peptides: Peptide[]) => {
            if(peptides.length == 0) {
                error.value = "This PRIDE assay contains no peptides.";
            } else {
                peptideList.value = peptides.join("\n");
            }
        })
        .catch(() => error.value = "Unable to fetch the PRIDE assay.")
        .finally(() => loading.value = false);
};

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
