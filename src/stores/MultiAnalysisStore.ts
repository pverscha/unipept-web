import { defineStore } from "pinia";
import { MultiProteomicsAnalysisStatus } from "unipept-web-components";
import { ref } from "vue";

const progressSteps = [
    "Analysing peptides",
    "Computing GO count table",
    "Computing GO ontology",
    "Computing EC count table",
    "Computing EC ontology",
    "Computing InterPro count table",
    "Computing InterPro ontology",
    "Computing lowest common ancestors",
    "Computing NCBI ontology",
    "Computing taxonomic tree",
    "Applying filter"
];

const filterSteps = [
    "Calculating sequences subset",
    "Filter count table",
    "Compute filtered GO count table",
    "Compute filtered EC count table",
    "Compute filtered InterPro count table"
];

const useMultiAnalysis = defineStore('multi-analysis', () => {
    const currentAssay = ref<MultiProteomicsAnalysisStatus>({} as MultiProteomicsAnalysisStatus);
    const assays: MultiProteomicsAnalysisStatus[] = [];

    const analyse = async (assay: MultiProteomicsAnalysisStatus) => {
        
    }
});
