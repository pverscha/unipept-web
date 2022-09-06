<template>
    <div>
        <LoadDatasetsCard></LoadDatasetsCard>
    </div>
</template>

<script setup lang="ts">
import useWebStore from "@/stores/WebStore";
import LoadDatasetsCard from "@/components/cards/analysis/LoadDatasetsCard.vue";
//import { ProteomicsAssay } from "unipept-web-components/types";

const webStore = useWebStore();

//webStore.addAssay({id: "test"} as ProteomicsAssay);

console.log(webStore.assays.join(""));
</script>
