import { defineStore } from "pinia";
import { SinglePeptideAnalysisStatus, Peptide, CountTable, Pept2DataCommunicator, NcbiId, NcbiOntologyProcessor, ProteinProcessor, NcbiResponseCommunicator, GoResponseCommunicator, EcOntologyProcessor, EcProteinCountTableProcessor, EcResponseCommunicator, GoOntologyProcessor, GoProteinCountTableProcessor, InterproOntologyProcessor, InterproProteinCountTableProcessor, InterproResponseCommunicator, PeptideData, NcbiTaxon, Ontology, GoCode, GoDefinition, EcCode, EcDefinition, InterproCode, InterproDefinition, NcbiTree, computeEcTree } from "unipept-web-components";
import { ref } from "vue";

const useSingleAnalysis = defineStore('single-analysis', () => {
    const pept2DataCommunicator = new Pept2DataCommunicator();
    const ncbiCommunicator = new NcbiResponseCommunicator();
    const goCommunicator = new GoResponseCommunicator();
    const ecCommunicator = new EcResponseCommunicator();
    const interproCommunicator = new InterproResponseCommunicator();

    const assay = ref<SinglePeptideAnalysisStatus>({
        peptide: "",
        equateIl: false,
        analysisInProgress: false,
        error: {
            status: false,
            message: "",
            object: null
        },
        ecTree: { count: 0, selfCount: 0 }
    } as SinglePeptideAnalysisStatus)

    const setPeptide = (peptide: Peptide) => assay.value.peptide = peptide; 

    const setEquateIl = (equateIl: boolean) => assay.value.equateIl = equateIl;

    const setInProgress = (inProgress: boolean) => assay.value.analysisInProgress = inProgress;

    const analyse = async (peptide: Peptide, equateIl: boolean) => {
        setPeptide(peptide);
        setEquateIl(equateIl);

        setInProgress(true);

        const peptideMap = new Map<Peptide, number>();
        peptideMap.set(peptide, 1);

        const peptideCountTable = new CountTable<Peptide>(peptideMap);

        const [pept2Data, trust] = await pept2DataCommunicator.process(peptideCountTable, false, equateIl);

        const proteinProcessor = new ProteinProcessor();
        await proteinProcessor.compute(peptide, equateIl);

        const ncbiCounts = new Map<NcbiId, number>();
        for (const protein of proteinProcessor.getProteins()) {
            ncbiCounts.set(protein.organism, 1);
        }

        ncbiCounts.set(proteinProcessor.getLca(), 1);

        for (const organismId of proteinProcessor.getCommonLineage()) {
            ncbiCounts.set(organismId, 1);
        }

        const ncbiOntologyProcessor = new NcbiOntologyProcessor(ncbiCommunicator);
        const ncbiOntology = await ncbiOntologyProcessor.getOntology(new CountTable<NcbiId>(ncbiCounts));

        const taxaCounts = new Map<NcbiId, number>();

        for (const protein of proteinProcessor.getProteins()) {
            taxaCounts.set(protein.organism, (taxaCounts.get(protein.organism) || 0) + 1);
        }

        const taxaCountTable = new CountTable<NcbiId>(taxaCounts);

        const taxaTree = new NcbiTree(taxaCountTable, ncbiOntology);

        const goProteinProcessor = new GoProteinCountTableProcessor(peptide, equateIl, goCommunicator);
        await goProteinProcessor.compute(proteinProcessor);

        const goOntologyProcessor = new GoOntologyProcessor(goCommunicator);
        const goOntology = await goOntologyProcessor.getOntology(goProteinProcessor.getCountTable());

        const ecProteinProcessor = new EcProteinCountTableProcessor(peptide, equateIl, ecCommunicator);
        await ecProteinProcessor.compute(proteinProcessor);

        const ecOntologyProcessor = new EcOntologyProcessor(ecCommunicator);
        const ecOntology = await ecOntologyProcessor.getOntology(ecProteinProcessor.getCountTable());

        const ecTree = computeEcTree(ecProteinProcessor.getCountTable(), ecOntology);

        const interproProteinProcessor = new InterproProteinCountTableProcessor(peptide, equateIl, interproCommunicator);
        await interproProteinProcessor.compute(proteinProcessor);

        const interproOntologyProcessor = new InterproOntologyProcessor(interproCommunicator);
        const interproOntology = await interproOntologyProcessor.getOntology(interproProteinProcessor.getCountTable());

        assay.value.peptideData = pept2Data.get(peptide)!;        
        assay.value.ncbiOntology = ncbiOntology;
        assay.value.proteinProcessor = proteinProcessor;
        assay.value.goProteinCountTableProcessor = goProteinProcessor;
        assay.value.goOntology = goOntology;
        assay.value.ecProteinCountTableProcessor = ecProteinProcessor;
        assay.value.ecOntology = ecOntology;
        assay.value.interproProteinCountTableProcessor = interproProteinProcessor;
        assay.value.interproOntology = interproOntology;
        assay.value.taxaTree = taxaTree;
        assay.value.ecTree = ecTree;

        setInProgress(false);

        console.log(assay.value);

        console.log("Store done");
    }

    return {
        assay,

        analyse
    }
});

export default useSingleAnalysis;
