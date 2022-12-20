<template>
    <v-container>
        <h1 class="font-weight-light">
            Unipept Desktop - Home
        </h1>
        <h3 class="font-weight-light mb-2">
            Main starting point of the application.
        </h3>
        <header-body-card title="Overview" id="overview" class="mb-5">
            <div class="d-flex justify-center">
                <v-img
                    :src="require('@/assets/documentation/desktop/home/desktop_home_overview.png')"
                    max-width="800"
                    contain />
            </div>
            <p>
                Every time you open the Unipept Desktop application, you will first be greated by the home page. This
                page is mainly used for project management and allows you to construct a new project, open an existing
                one or see a list of all recently opened projects.
            </p>
            <p>
                It is recommended to start playing around the with the demo project the first time that you open the
                application. Our demo project contains a few samples with interesting properties which you can freely
                browse through. The demo project can be opened by clicking the big blue button on the top of the
                home page.
            </p>
        </header-body-card>
        <header-body-card title="Updates and release notes" id="updates_release_notes" class="mb-5">
            <div class="d-flex align-center flex-column mb-5">
                <v-img
                    :src="require('@/assets/documentation/desktop/home/desktop_home_update_notification.png')"
                    max-width="800"
                    contain />
                <div>
                    <span class="font-weight-bold">Figure 1:</span> a notification is shown during the automatic
                    application update process on the bottom of the main application window.
                </div>
            </div>
            <p>
                The application will automatically be kept up-to-date. Everytime the application is started, it will
                automatically contact the Unipept update-servers and check if a new version if available. If this is
                the case, a notification will appear on the bottom of the application window. The notification shows
                the update progress and will ask you to restart the application once the update is finished. The
                previous version will be used as long as the app is not (manually) restarted.
            </p>
            <p>
                A summary of all changes that were made between the current version of the application and the previous
                version will always be displayed on the right side of the home page. This summary (for all versions)
                is also available on our
                <a href="https://github.com/unipept/unipept-desktop/releases">release notes page</a>.
            </p>
            <div class="d-flex align-center flex-column mb-5">
                <v-img
                    :src="require('@/assets/documentation/desktop/home/desktop_home_update_changes.png')"
                    max-width="800"
                    contain />
                <div>
                    <span class="font-weight-bold">Figure 2:</span> when an update is available, a small message will
                    appear on the homepage. A dialog with a summary of all changes will pop up after clicking on this
                    message.
                </div>
            </div>
        </header-body-card>
        <header-body-card title="Project Terminology" id="project_terminology" class="mb-5">
            <p>
                Every project in Unipept Desktop adheres to a specific structure. It's important that you grasp the
                different concepts and terminology involved with these projects. You can find a summary of the different
                terms that are used throughout this application below.
            </p>
            <h3>Project</h3>
            <p>
                A project is a collection of studies, and every study is a collection of assays. This terminology
                adheres to the definitions found in the ISA-tab standard.
            </p>
            <h3>Study</h3>
            <p>
                A study is a collection of assays that are somehow related. They, for example, all originate from the
                same object under study. Every study needs to be uniquely named, no two studies with the same name in
                the same project can exist! The application will inform you of a conflict, should one arise.
            </p>
            <h3>Assay</h3>
            <p>
                An assay corresponds directly to a list of peptides and the configuration of search settings for this
                assay. Note that a project can thus contain multiple assays with the same peptide content, but with a
                different search configuration. Every assay should be uniquely named within a study. Assays with the
                same name can only occur within one project, if they belong to different studies.
            </p>
        </header-body-card>
        <header-body-card title="Physical Project Structure" id="physical_project_structure">
            Every project corresponds to a single folder on your local file system. This folder will always contain
            at least the following files and folders:

            <ul>
                <li>
                    <span class="font-weight-bold">metadata.sqlite:</span>
                    This file is a SQLite-database that keeps track of the analysis results and metadata that belongs to
                    this project.
                </li>
                <li>
                    <span class="font-weight-bold">subfolder per study:</span> One folder per study is present. A
                    study's name is derived from the folder's name. The study's name in the application will change if
                    you change the name of this folder.
                    <ul>
                        <li>
                            <span class="font-weight-bold">file per assay:</span>
                            The study folder also contains one file per assay that belongs to this study. These files
                            end in the ".pep" extension and contain one peptide per line.
                        </li>
                    </ul>
                </li>
            </ul>
        </header-body-card>
    </v-container>
</template>

<script setup lang="ts">
import HeaderBodyCard from "@/components/cards/HeaderBodyCard.vue";
</script>

<style scoped>

</style>
