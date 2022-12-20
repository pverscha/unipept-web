<template>
    <v-container>
        <h1 class="font-weight-light">
            Unipept Desktop - Overview
        </h1>
        <h3 class="font-weight-light mb-2">
            Read this document to quickly get started to use our application.
        </h3>
        <header-body-card title="First Time Use" id="first_time_use" class="mb-5">
            <p>
                A few things are automatically set up the first time you start this application. You will directly
                notice a dialog popping up that downloads a small SQLite-database. This database contains static
                information about taxa and functional annotations. Every month, a new release of this database is
                automatically generated. Unipept Desktop will regularly check for a new version of this database and
                update it in the background.
            </p>
            <div class="d-flex justify-center">
                <v-img
                    :src="require('@/assets/documentation/desktop/desktop_download_static_database.png')"
                    max-width="800"
                    contain />
            </div>
            <p>
                Installation for this static database can take up to a few minutes, depending on the downlink of your
                internet connection. The application will continue to work if the installation fails for some reason, it
                will only take longer before analysis results are available. A new attempt to install the database will
                be made when you restart the application.
            </p>
        </header-body-card>
        <header-body-card title="Navigation Overview" id="navigation_overview">
            <div class="d-flex justify-center">
                <v-img :src="require('@/assets/documentation/desktop/desktop_navigation_overview.png')"
                    max-width="800"
                    contain />
            </div>
            <p>
                The application window will always consists of two main parts. On the far left (depicted in red in the
                screenshot), you will find the sidebar. The sidebar can be used to navigate between the different main
                functions of the application. Unipept's sidebar will always look the same, no matter which analysis page
                is selected. On the right (depicted in purple in the screenshot) the main content view is located. This
                is the part of the application that will change depending on the selected tab in the sidebar.
            </p>
            <p>
                Below you will find a summary of all icons in the sidebar and their associated function. A more detailed
                explanation for each of the application's pages is available below.
            </p>
            <div class="d-flex app-navigation-explanation pa-2 mb-2">
                <v-img :src="require('@/assets/documentation/desktop/desktop_home_button.png')"
                    max-width="50"
                    contain
                    class="mr-2" />
                <div>
                    <h3>Home</h3>
                    Use the &quot;Home&quot; button to return to the application's starting point (this is where you can
                    switch between projects).
                </div>
            </div>
            <div class="d-flex app-navigation-explanation pa-2 mb-2">
                <v-img :src="require('@/assets/documentation/desktop/desktop_single_analysis_button.png')"
                       max-width="50"
                       contain
                       class="mr-2" />
                <div>
                    <h3>Single Assay Analysis</h3>
                    The &quot;single assay analysis&quot; page allows you to browse all functional and taxonomic
                    analysis results that are available for each individual sample that was processed by Unipept.
                </div>
            </div>
            <div class="d-flex app-navigation-explanation pa-2 mb-2">
                <v-img :src="require('@/assets/documentation/desktop/desktop_comparative_button.png')"
                       max-width="50"
                       contain
                       class="mr-2" />
                <div>
                    <h3>Inter-assay Comparative Analysis</h3>
                    The &quot;inter-assay comparative analysis&quot; page allows you to construct a heatmap that can
                    be used to increase your understanding of the taxonomic or functional differences between different
                    samples.
                </div>
            </div>
            <div class="d-flex app-navigation-explanation pa-2 mb-2">
                <v-img :src="require('@/assets/documentation/desktop/desktop_single_peptide_button.png')"
                       max-width="50"
                       contain
                       class="mr-2" />
                <div>
                    <h3>Tryptic Peptide Analysis</h3>
                    The &quot;tryptic peptide analysis&quot; pipeline generates a report with all information that is
                    known for a single tryptic peptide. This includes a list of all proteins in which a given peptide is
                    contained, all functional annotations related with these proteins, as well as the lowest common
                    ancestor for this peptide.
                </div>
            </div>
            <div class="d-flex app-navigation-explanation pa-2 mb-2">
                <v-img :src="require('@/assets/documentation/desktop/desktop_database_button.png')"
                       max-width="50"
                       contain
                       class="mr-2" />
                <div>
                    <h3>Targeted Database Management</h3>
                    If you want to construct, delete or modify a targeted protein reference database (for use with the
                    metaproteomics analysis pipeline), you need to navigate to the
                    &quot;targeted database management&quot; page. This page will provide you with a list of all
                    available databases and their current construction status.
                </div>
            </div>
            <div class="d-flex app-navigation-explanation pa-2">
                <v-img :src="require('@/assets/documentation/desktop/desktop_settings_button.png')"
                       max-width="50"
                       contain
                       class="mr-2" />
                <div>
                    <h3>Settings</h3>
                    This button brings you to the settings page, which allows you to configure the application (e.g.
                    how many CPU cores can be used, configuration settings for communication with Docker, ...).
                </div>
            </div>
        </header-body-card>
    </v-container>
</template>

<script setup lang="ts">
import HeaderBodyCard from "@/components/cards/HeaderBodyCard.vue";
</script>

<style scoped>
    .app-navigation-explanation {
        border: 1px solid gray;
    }
</style>
