import { defineStore } from "pinia";
import { SinglePeptideAnalysisStatus, Peptide, CountTable, Pept2DataCommunicator, NcbiId, NcbiOntologyProcessor, ProteinProcessor, NcbiResponseCommunicator, GoResponseCommunicator, EcOntologyProcessor, EcProteinCountTableProcessor, EcResponseCommunicator, GoOntologyProcessor, GoProteinCountTableProcessor, InterproOntologyProcessor, InterproProteinCountTableProcessor, InterproResponseCommunicator } from "unipept-web-components";
import { ref } from "vue";

const useSingleAnalysis = defineStore('single-analysis', () => {
    const assay = ref<SinglePeptideAnalysisStatus>({
        peptide: "",
        equateIl: false,
        analysisInProgress: false,
        error: {
            status: false,
            message: "",
            object: null
        }
    } as SinglePeptideAnalysisStatus)

    const pept2DataCommunicator = new Pept2DataCommunicator();
    const ncbiCommunicator = new NcbiResponseCommunicator();
    const goCommunicator = new GoResponseCommunicator();
    const ecCommunicator = new EcResponseCommunicator();
    const interproCommunicator = new InterproResponseCommunicator();

    const setPeptide = (peptide: Peptide) => assay.value.peptide = peptide; 

    const setEquateIl = (equateIl: boolean) => assay.value.equateIl = equateIl;

    const setInProgress = (inProgress: boolean) => assay.value.analysisInProgress = inProgress;

    const analyse = async (peptide: Peptide, equateIl: boolean) => {
        setPeptide(peptide);
        setEquateIl(equateIl);

        setInProgress(true);

        console.log("Progress set to true");

        const peptideMap = new Map<Peptide, number>();
        peptideMap.set(peptide, 1);

        console.log("Peptide Map set");

        const peptideCountTable = new CountTable<Peptide>(peptideMap);

        console.log("Peptide count table created");

        const [pept2Data, trust] = await pept2DataCommunicator.process(peptideCountTable, false, equateIl);

        console.log("Pept2Data processed");

        const proteinProcessor = new ProteinProcessor();
        await proteinProcessor.compute(peptide, equateIl);

        console.log("Protein processor computed");

        const ncbiCounts = new Map<NcbiId, number>();
        for (const protein of proteinProcessor.getProteins()) {
            ncbiCounts.set(protein.organism, 1);
        }

        ncbiCounts.set(proteinProcessor.getLca(), 1);

        for (const organismId of proteinProcessor.getCommonLineage()) {
            ncbiCounts.set(organismId, 1);
        }

        console.log("Ncbi counts computed");

        const ncbiOntologyProcessor = new NcbiOntologyProcessor(ncbiCommunicator);
        const ncbiOntology = await ncbiOntologyProcessor.getOntology(new CountTable<NcbiId>(ncbiCounts));

        console.log("Ncbi ontology created");

        const goProteinProcessor = new GoProteinCountTableProcessor(peptide, equateIl, goCommunicator);
        await goProteinProcessor.compute(proteinProcessor);

        console.log("Go processor created");

        const goOntologyProcessor = new GoOntologyProcessor(goCommunicator);
        const goOntology = await goOntologyProcessor.getOntology(goProteinProcessor.getCountTable());

        console.log("Go ontology created");

        const ecProteinProcessor = new EcProteinCountTableProcessor(peptide, equateIl, ecCommunicator);
        await ecProteinProcessor.compute(proteinProcessor);

        console.log("Ec processor created");

        const ecOntologyProcessor = new EcOntologyProcessor(ecCommunicator);
        const ecOntology = await ecOntologyProcessor.getOntology(ecProteinProcessor.getCountTable());

        console.log("Ec ontology created");

        const interproProteinProcessor = new InterproProteinCountTableProcessor(peptide, equateIl, interproCommunicator);
        await interproProteinProcessor.compute(proteinProcessor);

        console.log("Interpro processor created");

        const interproOntologyProcessor = new InterproOntologyProcessor(interproCommunicator);
        const interproOntology = await interproOntologyProcessor.getOntology(interproProteinProcessor.getCountTable());

        console.log("Interpro ontology created");

        assay.value.peptideData = pept2Data.get(peptide)!;        
        assay.value.ncbiOntology = ncbiOntology;
        assay.value.proteinProcessor = proteinProcessor;
        assay.value.goProteinCountTableProcessor = goProteinProcessor;
        assay.value.goOntology = goOntology;
        assay.value.ecProteinCountTableProcessor = ecProteinProcessor;
        assay.value.ecOntology = ecOntology;
        assay.value.interproProteinCountTableProcessor = interproProteinProcessor;
        assay.value.interproOntology = interproOntology;

        setInProgress(false);

        console.log("progress set to:");
        console.log(assay.value.analysisInProgress);
    }

    return {
        assay,

        analyse
    }
});

export default useSingleAnalysis;
