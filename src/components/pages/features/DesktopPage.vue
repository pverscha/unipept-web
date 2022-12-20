<template>
    <v-container>
        <v-row>
            <div class="col-lg-10 order-lg-0 order-1 pt-0">
                <router-view></router-view>
            </div>
            <VerticalNavigation v-if="$vuetify.breakpoint.lgAndUp" class="col-lg-2 order-lg-1 d-sm-none d-lg-flex" :items="navigation" />
            <HorizontalNavigation v-else class="col-12 order-0" :items="navigation" />
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import VerticalNavigation from "@/components/navigation/VerticalNavigation.vue";
import HorizontalNavigation from "@/components/navigation/HorizontalNavigation.vue";

const navigation = [
    {
        name: "Overview",
        link: "/desktop",
        children: [
            { name: "Download", link: "#download" },
            { name: "Install for Windows", link: "#windows_installation" },
            { name: "Install for macOS", link: "#macos_installation" },
            { name: "Install for Linux", link: "#linux_installation" },
            { name: "Update", link: "#update" }
        ]
    },
    {
        name: "Application overview",
        link: "/desktop/application-overview",
        children: [
            { name: "First time use", link: "#first_time_use" },
            { name: "Navigation overview", link: "#navigation_overview" }
        ]
    },
    {
        name: "Home",
        link: "/desktop/home",
        children: [
            { name: "Overview", link: "#overview" },
            { name: "Project terminology", link: "#project_terminology" },
            { name: "Updates and release notes", link: "#updates_release_notes" },
            { name: "Physical project structure", link: "#physical_project_structure" }
        ]
    },
    {
        name: "Single Assay Analysis",
        link: "/desktop/single-assay-analysis",
        children: [
            { name: "Overview", link: "#overview" },
            { name: "Analysing an assay", link: "#analysing_assay" }
        ]
    }
]
</script>
