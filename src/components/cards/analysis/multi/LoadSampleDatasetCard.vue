<template>
    <v-card flat>
        <v-card-text>
            <div v-if="loading" style="display: flex; justify-content: center;">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div>
            <div v-else-if="error" class="connection-error">
                <v-alert type="error">
                    Unable to retrieve list of sample datasets.
                </v-alert>
            </div>
            <div v-else v-for="dataset of sampleDatasets" v-bind:key="dataset.id">
                <b>Environment:</b> {{ dataset.environment }}
                <br>
                <b>Reference:</b>
                <small>
                    {{ dataset.reference }}
                    <a target="_blank" title="Article website" :href="dataset.url">
                        <span class="glyphicon glyphicon-link"></span>
                    </a>
                    <a target="_blank" title="Project website" :href="dataset.projectWebsite">
                        <span class="glyphicon glyphicon-share-alt"></span>
                    </a>
                </small>
                <br>
                <div class="load-sample-container">
                    <v-row>
                        <v-col :cols="7">
                            <v-select
                                :items="dataset.datasets"
                                item-text="name"
                                v-model="selectedSampleDataset[dataset.id]"
                            />
                        </v-col>
                        <v-col :cols="5" style="display: flex; align-items: center;" class="load-dataset-button">
                            <v-btn @click="selectSampleDataset(dataset.id)">Load dataset</v-btn>
                        </v-col>
                    </v-row>
                </div>
            </div>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import useAssays from '@/stores/AssayStore';
import { onMounted, ref } from 'vue';

interface SampleDataset {
    name: string;
    data: string[];
    order: number;
}

interface SampleDatasetCollection {
    id: string;
    environment: string;
    projectWebsite: string;
    reference: string;
    url: string;
    datasets: SampleDataset[];
}

const assayStore = useAssays();

const loading = ref<boolean>(false);
const error = ref<boolean>(false);

const sampleDatasets: SampleDatasetCollection[] = [];
const selectedSampleDataset: any = ref<any>({});

const retrieveDatasets = () => {
    loading.value = true;
    error.value = false;

    // @ts-ignore
    fetch(`${process.env.VUE_APP_UNIPEPT_API_URL}/datasets/sampledata`, { method: "POST", body: JSON.stringify({}) })
        .then(response => response.json())
        .then(response => { console.log(response); return response; })
        .then(response => {
            for(let item of response.sample_data) {
                const itemDatasets = item.datasets.sort((a: SampleDataset, b: SampleDataset) => a.order - b.order);
                sampleDatasets.push({
                    id: item.id,
                    environment: item.environment,
                    projectWebsite: item.project_website,
                    reference: item.reference,
                    url: item.url,
                    datasets: itemDatasets
                });
                selectedSampleDataset.value[item.id] = itemDatasets[0].name;
            }
        })
        .catch(() => error.value = true )
        .finally(() => loading.value = false );
};

const selectSampleDataset = (id: string) => {
    const sampleDatasetCollection: SampleDatasetCollection = sampleDatasets.find(
        dataset => dataset.id == id
    )!;

    const sampleDataset: SampleDataset = sampleDatasetCollection.datasets.find(
        dataset => dataset.name == selectedSampleDataset.value[id]
    )!;

    assayStore.addSelectedAssay({
        name: sampleDataset.name,
        peptides: sampleDataset.data,
        amountOfPeptides: sampleDataset.data.length,
        createdAt: new Date()
    });
};

onMounted(retrieveDatasets);
</script>
