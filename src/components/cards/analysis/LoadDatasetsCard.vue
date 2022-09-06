<template>
    <v-card>
        <v-tabs
            v-model="currentTab"
        >
            <v-tab>
                Create
            </v-tab>
            <v-tab>
                Sample data
            </v-tab>
            <v-tab>
                Pride
            </v-tab>
            <v-tab>
                Local data
            </v-tab>
        </v-tabs>
        <v-tabs-items v-model="currentTab">
            <v-tab-item>
                <create-dataset-card
                    @create-assay="webStore.addAssay"
                >
                </create-dataset-card>
            </v-tab-item>
            <v-tab-item>
                <load-sample-dataset-card
                    @create-assay="webStore.addAssay"
                    @destroy-assay="webStore.removeAssay"
                >
                </load-sample-dataset-card>
            </v-tab-item>

            <v-tab-item>
                <load-local-dataset-card
                    v-on:create-assay="webStore.addAssay"
                    v-on:destroy-assay="webStore.removeAssay"
                    :stored-assays="webStore.assays">
                </load-local-dataset-card>
            </v-tab-item>
        </v-tabs-items>
        <v-snackbar v-model="errorSnackbar" color="error" multi-line :timeout="0" top>
            Could not save this assay due to storage restrictions. You can still analyse the assay now, but you will not
            be able to restore it in future sessions. Please delete some unused assays to make space for this one.
            <v-btn color="white" text @click="errorSnackbar = false">
                Close
            </v-btn>
        </v-snackbar>
    </v-card>
</template>

<script setup lang="ts">
import {
    CreateDatasetCard,
    LoadSampleDatasetCard,
    LoadLocalDatasetCard
} from "unipept-web-components"
import useWebStore from "@/stores/WebStore";
import { ref } from "vue";

const webStore = useWebStore();

const currentTab = ref(0);
const errorSnackbar = false;


</script>
