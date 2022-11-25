import { defineStore } from "pinia";
import { EcCountTableProcessor, EcOntologyProcessor, EcResponseCommunicator, GoCountTableProcessor, GoOntologyProcessor, GoResponseCommunicator, InterproCountTableProcessor, InterproOntologyProcessor, InterproResponseCommunicator, LcaCountTableProcessor, MultiProteomicsAnalysisStatus, NcbiOntologyProcessor, NcbiResponseCommunicator, NcbiTree, Pept2DataCommunicator, PeptideCountTableProcessor, ProgressUtils } from "unipept-web-components";
import { Assay } from "unipept-web-components";
import { computed, ref } from "vue";

const enum ProgressSteps {
    PEPT2DATA,
    GO_COUNT_TABLE,
    GO_ONTOLOGY,
    EC_COUNT_TABLE,
    EC_ONTOLOGY,
    INTERPRO_COUNT_TABLE,
    INTERPRO_ONTOLOGY,
    LCA_COUNT_TABLE,
    NCBI_ONTOLOGY,
    NCBI_TREE,
    COMPLETED,
}

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
    "Analysis completed",
];


const filterSteps = [
    "Calculating sequences subset",
    "Filter count table",
    "Compute filtered GO count table",
    "Compute filtered EC count table",
    "Compute filtered InterPro count table"
];

const useMultiAnalysis = defineStore('multi-analysis', () => {
    const pept2DataCommunicator = new Pept2DataCommunicator(
        process.env.VUE_APP_UNIPEPT_API_URL,
        +process.env.VUE_APP_PEPTDATA_BATCH_SIZE!,
        +process.env.VUE_APP_MISSED_CLEAVAGE_BATCH_SIZE!,
        +process.env.VUE_APP_PARALLEL_REQUESTS!
    );

    // @ts-ignore
    GoResponseCommunicator.setup(process.env.VUE_APP_UNIPEPT_API_URL, +process.env.VUE_APP_GO_BATCH_SIZE!);
    const goCommunicator = new GoResponseCommunicator();

    // @ts-ignore
    EcResponseCommunicator.setup(process.env.VUE_APP_UNIPEPT_API_URL, +process.env.VUE_APP_EC_BATCH_SIZE!);
    const ecCommunicator = new EcResponseCommunicator();

    // @ts-ignore
    InterproResponseCommunicator.setup(process.env.VUE_APP_UNIPEPT_API_URL, +process.env.VUE_APP_INTERPRO_BATCH_SIZE!);
    const interproCommunicator = new InterproResponseCommunicator();

    const ncbiCommunicator = new NcbiResponseCommunicator();
    
    const assayStatuses = ref<MultiProteomicsAnalysisStatus[]>([] as MultiProteomicsAnalysisStatus[]);
    const activeAssayStatus = ref<MultiProteomicsAnalysisStatus | undefined>(undefined);

    const empty = computed(() => assayStatuses.value.length === 0);
    const done = computed(() => activeAssayStatus.value?.analysisInProgress || false);

    const findAssayIndex = (assayId: string): number => {
        return assayStatuses.value.findIndex(status => status.assay.id == assayId);
    }

    const updateProgress = (assay: Assay, value: number, step: number, filter: boolean) => {
        const index = findAssayIndex(assay.id);

        const progress = filter ? assayStatuses.value[index].filterProgress : assayStatuses.value[index].progress;

        progress.currentValue = value;
        progress.currentStep = step;

        // Get the current time
        const currentTime = new Date().getTime();

        // Set end time of the previous step if it is not the first step
        if (step > 0) {
            progress.steps[step - 1].end = currentTime;
        }

        // Set start time of the current step
        if (progress.steps[step].start === 0) {
            progress.steps[step].start = currentTime;
        }

        // Calculate the eta
        const elapsedTime = currentTime - progress.steps[0].start;
        if (elapsedTime > 500) {
            progress.eta = elapsedTime * (100 - value) / value;
            return;
        }

        progress.eta = -1;
    }

    const analyse = async (assay: Assay, equateIl: boolean, filterDuplicates: boolean, cleavageHandling: boolean) => {
        const assayIndex = findAssayIndex(assay.id);
        const assayStatus = assayStatuses.value[assayIndex];

        assayStatus.equateIl = equateIl;
        assayStatus.filterDuplicates = filterDuplicates;
        assayStatus.cleavageHandling = cleavageHandling;

        if(!activeAssayStatus.value) {
            activeAssayStatus.value = assayStatus;
        }

        assayStatus.analysisInProgress = true;
        assayStatus.analysisReady = false;
        assayStatus.error = {
            status: false,
            message: "",
            object: null
        };

        try {
            const peptideCountTableProcessor = new PeptideCountTableProcessor();
            const peptideCountTable = await peptideCountTableProcessor.getPeptideCountTable(
                assay.peptides, assayStatus.cleavageHandling, assayStatus.filterDuplicates,assayStatus.equateIl
            );

            const [pept2Data, trust] = await pept2DataCommunicator.process(
                peptideCountTable, assayStatus.cleavageHandling, assayStatus.equateIl, {
                    onProgressUpdate(progress: number) {
                        updateProgress(assay, Math.round(progress * 100) - 10, ProgressSteps.PEPT2DATA, false);
                    }
                }
            );

            updateProgress(assay, 91, ProgressSteps.GO_COUNT_TABLE, false);

            const goCountTableProcessor = new GoCountTableProcessor(peptideCountTable, pept2Data, goCommunicator);
            await goCountTableProcessor.compute();

            updateProgress(assay, 92, ProgressSteps.GO_ONTOLOGY, false);

            const goOntologyProcessor = new GoOntologyProcessor(goCommunicator);
            const goOntology = await goOntologyProcessor.getOntology(goCountTableProcessor.getCountTable());

            updateProgress(assay, 93, ProgressSteps.EC_COUNT_TABLE, false);

            const ecCountTableProcessor = new EcCountTableProcessor(peptideCountTable, pept2Data, ecCommunicator);
            await ecCountTableProcessor.compute();

            updateProgress(assay, 94, ProgressSteps.EC_ONTOLOGY, false);

            const ecOntologyProcessor = new EcOntologyProcessor(ecCommunicator);
            const ecOntology = await ecOntologyProcessor.getOntology(ecCountTableProcessor.getCountTable());

            updateProgress(assay, 95, ProgressSteps.INTERPRO_COUNT_TABLE, false);

            const interproCountTableProcessor = new InterproCountTableProcessor(peptideCountTable, pept2Data, interproCommunicator);
            await interproCountTableProcessor.compute();

            updateProgress(assay, 96, ProgressSteps.INTERPRO_ONTOLOGY, false);

            const interproOntologyProcessor = new InterproOntologyProcessor(interproCommunicator);
            const interproOntology = await interproOntologyProcessor.getOntology(interproCountTableProcessor.getCountTable());

            updateProgress(assay, 97, ProgressSteps.LCA_COUNT_TABLE, false);

            const lcaCountTableProcessor = new LcaCountTableProcessor(peptideCountTable, pept2Data);
            await lcaCountTableProcessor.compute();

            updateProgress(assay, 98, ProgressSteps.NCBI_ONTOLOGY, false);

            const ncbiOntologyProcessor = new NcbiOntologyProcessor(ncbiCommunicator);
            const ncbiOntology = await ncbiOntologyProcessor.getOntology(lcaCountTableProcessor.getCountTable());

            updateProgress(assay, 99, ProgressSteps.NCBI_TREE, false);

            const tree = new NcbiTree(
                lcaCountTableProcessor.getCountTable(), ncbiOntology, lcaCountTableProcessor.getAnnotationPeptideMapping()
            );

            // Update status
            assayStatus.assay = assay;
            assayStatus.pept2Data = pept2Data;
            assayStatus.goOntology = goOntology;
            assayStatus.ecOntology = ecOntology;
            assayStatus.interproOntology = interproOntology;
            assayStatus.ncbiOntology = ncbiOntology;

            // Update data
            assayStatus.data = {
                peptideCountTable: peptideCountTable,
                goCountTableProcessor: goCountTableProcessor,
                ecCountTableProcessor: ecCountTableProcessor,
                interproCountTableProcessor: interproCountTableProcessor,
                lcaCountTableProcessor: lcaCountTableProcessor,
                tree: tree,
                trust: trust
            }

            // Update filter data
            assayStatus.filteredData = {
                peptideCountTable: peptideCountTable,
                goCountTableProcessor: goCountTableProcessor,
                ecCountTableProcessor: ecCountTableProcessor,
                interproCountTableProcessor: interproCountTableProcessor,
                percentage: 5,
                trust: trust
            };
        } catch(error: any) {
            console.log(error);

            assayStatus.error = {
                status: true,
                message: error.message,
                object: error
            };
        } finally {
            assayStatus.analysisInProgress = false;
            assayStatus.analysisReady = true;
            assayStatus.filterReady = true;

            updateProgress(assay, 100, ProgressSteps.COMPLETED, false);
        }
    }

    const filter = async (assayId: string) => {
        // TODO: implement
    }

    const analysisCompleted = (assayId: string) => {
        const assayIndex = findAssayIndex(assayId);
        const assayStatus = assayStatuses.value[assayIndex];

        return assayStatus.progress.currentStep === ProgressSteps.COMPLETED;
    }

    const addAssay = (assay: Assay) => {
        if(findAssayIndex(assay.id) === -1) {
            assayStatuses.value.push({
                assay: assay,

                progress: ProgressUtils.constructProgressObject(progressSteps),
                filterProgress: ProgressUtils.constructProgressObject(filterSteps)
            } as MultiProteomicsAnalysisStatus);
        }
    }

    const removeAssay = (assay: Assay) => {
        const index = findAssayIndex(assay.id);

        if(index !== -1) {
            // Remove the assay from the list of assays
            assayStatuses.value.splice(index, 1);

            // Update the active item
            if(assayStatuses.value.length > 0) {
                activeAssayStatus.value = assayStatuses.value[0];
            } else {
                activeAssayStatus.value = undefined;
            }
        }
    };

    const removeAllAssays = () => {
        assayStatuses.value.splice(0, assayStatuses.value.length);
        activeAssayStatus.value = undefined;
    };

    const activateAssay = (assay: Assay) => {
        const index = findAssayIndex(assay.id);
        activeAssayStatus.value = assayStatuses.value[index];
    }

    return {
        assayStatuses,
        activeAssayStatus,

        empty,
        done,
        analysisCompleted,

        addAssay,
        removeAssay,
        removeAllAssays,
        activateAssay,
        analyse,
        filter
    }
});

export default useMultiAnalysis;
