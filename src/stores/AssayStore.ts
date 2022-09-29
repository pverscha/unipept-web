import { defineStore } from "pinia"
import { useLocalStorage } from "@vueuse/core";
import { computed, ref } from "vue";

export interface Assay {
    name: string
    peptides: string[]
    amountOfPeptides: number
    createdAt: Date
}

const findAssayIndex = (assay: Assay, list: Assay[]): number => {
    if(!assay) {
        return -1;
    }

    return list.findIndex((value: Assay) => {
        return value.name === assay.name
    });
}

const useAssays = defineStore('assays', () => {
    const localAssays = useLocalStorage('web-assays', [] as Assay[]);
    const selectedAssays = ref<Assay[]>([] as Assay[]);

    // Getters
    const noLocalAssays = computed(() => localAssays.value.length === 0);
    const noSelectedAssays = computed(() => selectedAssays.value.length === 0);

    // Mutations
    const addLocalAssay = (assay: Assay) => {
        if(findAssayIndex(assay, localAssays.value) === -1) {
            localAssays.value.push(assay);
        }
    };

    const removeLocalAssay = (assay: Assay) => {
        const idx = findAssayIndex(assay, localAssays.value);

        if(idx !== -1) {
            localAssays.value.splice(idx, 1);
        }
    };

    const addSelectedAssay = (assay: Assay) => {
        if(findAssayIndex(assay, selectedAssays.value) === -1) {
            selectedAssays.value.push(assay);
        }
    };

    const removeSelectedAssay = (assay: Assay) => {
        const idx = findAssayIndex(assay, selectedAssays.value);

        if(idx !== -1) {
            selectedAssays.value.splice(idx, 1);
        }
    };

    const resetSelectedAssays = () => {
        selectedAssays.value = [];
    };

    return {
        localAssays,
        selectedAssays,

        noLocalAssays,
        noSelectedAssays,

        addLocalAssay,
        removeLocalAssay,
        addSelectedAssay,
        removeSelectedAssay,
        resetSelectedAssays
    }
});

export default useAssays;
