<template>
    <v-container>
        <h1 class="font-weight-light">
            Unipept Desktop - Inter-assay Comparative Analysis
        </h1>
        <h3 class="font-weight-light mb-2">
            Visually compare features between different assays
        </h3>
        <header-body-card title="Overview" id="overview" class="mb-5">
            <div class="d-flex justify-center">
                <v-img
                    :src="require('@/assets/documentation/desktop/inter_assay_comparative_analysis/desktop_comparison_overview.png')"
                    max-width="800"
                    contain />
            </div>

            <p>
                Unipept offers a powerful tool for comparing features over multiple assays. This tool can be used to
                gain insight into the shifts in population and function when studying multiple conditions or changing
                environmental parameters. This page is mostly used as a secondary step in the analysis of a
                metaproteomics environment (after the &quot;Single assay analysis&quot; page).
            </p>

            <p>
                The most important feature of this page is the heatmap. This heatmap can easily be constructed by
                first selecting a set of assays that you want to include in your comparison. You can do so by ticking
                the corresponding checkboxes in the project explorer view on the left side of the application. As
                soon as at least one assay is selected, the first step in the heatmap construction wizard will pop up.
                We will be going over each of these steps now in more detail below.
            </p>

            <h3>Data source selection</h3>
            <p>
                Once you have selected a collection of assays that you want to include in the comparison, you need to
                choose a set of features that you want to compare between the different assays. A data source is one of
                the following:
            </p>

            <ul>
                <li>
                    <span class="font-weight-bold">NCBI Taxonomy:</span> choose from a list of all organisms that are
                    identified in the selected assays.
                </li>
                <li>
                    <span class="font-weight-bold">Gene Ontology:</span> choose from a list of all Gene Ontology terms
                    that are identified in the selected assays.
                </li>
                <li>
                    <span class="font-weight-bold">Enzyme Commission:</span> choose from a list of all Enzyme Commission
                    numbers that are identified in the selected assays.
                </li>
                <li>
                    <span class="font-weight-bold">InterPro:</span> choose from a list of all InterPro-entries that are
                    identified in the selected assays.
                </li>
            </ul>

            <p>
                Please note that you can only compare features from one datasource at a time. It's not possible to
                mix features from distinct data sources and visualize them at the same time in the heatmap.
            </p>

            <h3>Normalization</h3>
            <p>
                The second step required for the heatmap construction consists of choosing which type of normalization
                should be applied to the input data. There are three normalization types available:
            </p>

            <ul>
                <li>
                    <span class="font-weight-bold">All:</span> compute the largest values over all cells in the heatmap
                    and normalize all cells according to this one value.
                </li>
                <li>
                    <span class="font-weight-bold">Rows:</span> compute the largest value for each row in the heatmap
                    and normalize all cells on a row-by-row basis. The relative values between distinct rows can not
                    directly be compared in this case (but values within one row can).
                </li>
                <li>
                    <span class="font-weight-bold">Columns:</span> compute the largest vlaue for each column in the
                    heatmap and normalize all cells on a column-by-column basis. The relative vales between distinct
                    columns can not directly be compared in this case (but values within one column can).
                </li>
            </ul>

            <h3>Visualization</h3>
            <p>
                Once all of the previous steps have properly been configured, the end result will be shown here. If
                everything goes well, you will be greeted by an interactive heatmap.
            </p>
            <div class="d-flex justify-center">
                <v-img
                    :src="require('@/assets/documentation/desktop/inter_assay_comparative_analysis/desktop_comparison_heatmap.png')"
                    max-width="800"
                    contain />
            </div>
        </header-body-card>
    </v-container>
</template>

<script setup lang="ts">
import HeaderBodyCard from "@/components/cards/HeaderBodyCard.vue";
</script>

<style scoped>

</style>
