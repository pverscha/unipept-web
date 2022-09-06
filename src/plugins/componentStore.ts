import {
    createAssayStore,
    AssayState,
    lcaOntologyStore,
    FilterStore,
    CountTable,
    Peptide,
    EcCountTableProcessor,
    GoCountTableProcessor,
    InterproCountTableProcessor,
    SearchConfiguration,
    CommunicationSource,
    ProteomicsAssay,
    EcOntologyProcessor,
    GoOntologyProcessor,
    InterproOntologyProcessor,
    ProgressListener,
    FunctionalOntologyStoreFactory,
    AssayProcessor,
    Pept2DataCommunicator,
    DefaultCommunicationSource,
    NcbiId,
    NcbiTaxon,
    Ontology
} from "unipept-web-components";

import Vue from "vue";
import Vuex, { ActionContext, GetterTree, MutationTree, ActionTree } from "vuex";

export interface WebState {
    // Which assay are stored in this browser's local storage?
    storedAssays: ProteomicsAssay[],
    searchConfiguration: SearchConfiguration
}

const storageState: WebState = {
    storedAssays: [],
    searchConfiguration: new SearchConfiguration()
};

const storageGetters: GetterTree<WebState, any> = {
    storedAssays(state: WebState): ProteomicsAssay[] {
        return state.storedAssays;
    },
    searchConfiguration(state: WebState): SearchConfiguration {
        return state.searchConfiguration;
    }
}

/**
 * Find the index of an assay in the given list. Assay identity is based on ID. Assays with equal ID's are considered
 * to be equal.
 *
 * @param item The item for which it's position in the given list should be found.
 * @param list The list in which we look for the index of the given assay.
 * @return Position of the given item, in the given list. -1 if the item was not found.
 */
const findAssayIndex = function(item: ProteomicsAssay, list: ProteomicsAssay[]): number {
    if (!item) {
        return -1;
    }

    return list.findIndex((value: ProteomicsAssay) => value.getId() === item.getId() || value.getName() === item.getName());
}


const storageMutations: MutationTree<WebState> = {
    /**
     * Add a previously stored assay to the list of stored datasets. Note that this mutation does not persistently store
     * the assay itself. This is the responsibility of the caller. The new assay will be added to the end of the list.
     *
     * @param state Instance of the StorageState to which the given assay should be added.
     * @param assay The assay that should be added to the list of stored assays. This assay will not be persistently
     * stored by this function, it will only be marked as stored.
     */
    ADD_STORED_ASSAY(state: WebState, assay: ProteomicsAssay) {
        const idx: number = findAssayIndex(assay, state.storedAssays);

        if (idx === -1) {
            state.storedAssays.push(assay);
        }
    },
    SET_SEARCH_CONFIGURATION(state: WebState, config: SearchConfiguration) {
        state.searchConfiguration = config;
    },
    REMOVE_STORED_ASSAY(state: WebState, assay: ProteomicsAssay) {
        const idx: number = findAssayIndex(assay, state.storedAssays);

        if (idx !== -1) {
            state.storedAssays.splice(idx, 1);
        }
    }
}

const storageActions: ActionTree<WebState, any> = {
    addStoredAssay(store: ActionContext<WebState, any>, assay: ProteomicsAssay) {
        store.commit("ADD_STORED_ASSAY", assay);
    },

    /**
     * Remove an assay from the list of stored assays. If the assay was also selected for analysis, it will also be
     * removed from the analysis. This action does not persistently store the assay itself, that is the responsibility
     * of the caller.
     *
     * @param store Instance of the store to which a new stored assay should be added.
     * @param assay The assay that should be added to the list of stored assays.
     */
    async removeStoredAssay(store: ActionContext<WebState, any>, assay: ProteomicsAssay) {
        await store.dispatch("removeAssay", assay);
        store.commit("REMOVE_STORED_ASSAY", assay);
    },

    setSearchConfiguration(store: ActionContext<WebState, any>, config: SearchConfiguration) {
        store.commit("SET_SEARCH_CONFIGURATION", config);
    },

    lcaOntologyProcessed(store: ActionContext<WebState, any>, [assay, ontology]: [ProteomicsAssay, Ontology<NcbiId, NcbiTaxon>]) {}
};

export const webStore = {
    state: storageState,
    mutations: storageMutations,
    getters: storageGetters,
    actions: storageActions
}

class WebCommunicationSource extends DefaultCommunicationSource {
    constructor(
        private readonly pept2DataCommunicator: Pept2DataCommunicator
    ) {
        super();
    }

    public getPept2DataCommunicator(): Pept2DataCommunicator {
        return this.pept2DataCommunicator;
    }
}

class WebAssayProcessor implements AssayProcessor {
    private pept2DataCommunicator: Pept2DataCommunicator;
    private cancelled: boolean = false;

    constructor(
        private readonly assay: ProteomicsAssay,
        private readonly progressListener?: ProgressListener
    ) {
        this.pept2DataCommunicator = new Pept2DataCommunicator();
    }

    public cancel(): void {
        this.cancelled = true;
        if (this.pept2DataCommunicator) {
            this.pept2DataCommunicator.cancel();
        }
    }

    public isCancelled(): boolean {
        return this.cancelled;
    }

    public async processAssay(countTable: CountTable<Peptide>, forceUpdate: boolean, searchSettings: SearchConfiguration): Promise<CommunicationSource> {
        // We need to reprocess this assay and store the results in the database.
        // Process assay and write results to database.
        const pept2DataProgressNotifier: ProgressListener = {
            onProgressUpdate: (val: number) => this.setProgress(val)
        }

        console.log("Processing!");
        console.log(searchSettings);

        // Preload all data for this assay
        await this.pept2DataCommunicator.process(
            countTable,
            searchSettings,
            pept2DataProgressNotifier
        );

        this.setProgress(1);
        return new WebCommunicationSource(this.pept2DataCommunicator);
    }

    private setProgress(value: number) {
        if (this.progressListener) {
            this.progressListener.onProgressUpdate(value);
        }
    }
}

Vue.use(Vuex);

const functionalStoreFactory = new FunctionalOntologyStoreFactory();
const ecStore = functionalStoreFactory.createOntologyStore(
    (
        x: CountTable<Peptide>,
        configuration: SearchConfiguration,
        communicationSource: CommunicationSource
    ) => new EcCountTableProcessor(x, configuration, communicationSource),
    (communicationSource: CommunicationSource) => new EcOntologyProcessor(communicationSource)
);
const goStore = functionalStoreFactory.createOntologyStore(
    (
        x: CountTable<Peptide>,
        configuration: SearchConfiguration,
        communicationSource: CommunicationSource
    ) => new GoCountTableProcessor(x, configuration, communicationSource),
    (communicationSource: CommunicationSource) => new GoOntologyProcessor(communicationSource)
);
const iprStore = functionalStoreFactory.createOntologyStore(
    (
        x: CountTable<Peptide>,
        configuration: SearchConfiguration,
        communicationSource: CommunicationSource
    ) => new InterproCountTableProcessor(x, configuration, communicationSource),
    (communicationSource: CommunicationSource) => new InterproOntologyProcessor(communicationSource)
);

const assayStore = createAssayStore((
    store: ActionContext<AssayState, any>,
    assay: ProteomicsAssay,
    progressListener: ProgressListener
) => {
    return new WebAssayProcessor(assay, progressListener);
});

const configStore = {
    state: {},
    mutations: {},
    getters: {
        baseUrl(state: any): string {
            return "https://api.unipept.ugent.be"
        }
    },
    actions: {}
}

const store = new Vuex.Store({
    modules: {
        assay: assayStore,
        storage: webStore,
        filter: FilterStore,
        configuration: configStore,
        ec: ecStore,
        go: goStore,
        interpro: iprStore,
        ncbi: lcaOntologyStore
    }
});

export default store;
