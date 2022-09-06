import { defineStore } from "pinia"
import { ProteomicsAssay, SearchConfiguration } from "unipept-web-components/types";
import { ref } from "vue";
import { useStorage } from "@vueuse/core";

const findAssayIndex = (assay: ProteomicsAssay, list: ProteomicsAssay[]): number => {
    if(!assay) {
        return -1;
    }

    return list.findIndex((value: ProteomicsAssay) => {
        return value.getId() === assay.getId() || value.getName() === assay.getName()
    });
}

export default defineStore('web', () => {
    const assays = useStorage('web-assays', [] as ProteomicsAssay[]);
    const searchConfiguration = ref<SearchConfiguration>();

    // Mutations
    const addAssay = (assay: ProteomicsAssay) => {
        assays.value.push(assay);
    };

    const removeAssay = (assay: ProteomicsAssay) => {
        const idx = findAssayIndex(assay, assays.value);

        if(idx !== -1) {
            assays.value.splice(idx, 1);
        }
    };

    const setSearchConfiguration = (newSearchConfiguration: SearchConfiguration) => {
        searchConfiguration.value = newSearchConfiguration;
    }

    return {
        assays,
        searchConfiguration,

        addAssay,
        removeAssay,
        setSearchConfiguration
    }
});
