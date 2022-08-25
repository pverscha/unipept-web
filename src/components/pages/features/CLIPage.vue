<template>
    <v-container>
        <v-row>
            <div class="col-lg-10 order-lg-0 order-1 pt-0">
                <router-view></router-view>
            </div>
            <VerticalNavigation v-if="$vuetify.breakpoint.lgAndUp" class="col-lg-2 order-lg-1 d-sm-none d-lg-flex" :items="navigation"/>
            <HorizontalNavigation v-else class="col-12 order-0" :items="navigation" />
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import VerticalNavigation from "@/components/navigation/VerticalNavigation.vue";
import HorizontalNavigation from "@/components/navigation/HorizontalNavigation.vue";

const navigation = [
    { name: "Overview", link: "/clidocs" },
    { name: "Case studies", link: "/clidocs/casestudies" },
    { name: "uniprot", link: "/clidocs/uniprot" },
    { name: "prot2pept", link: "/clidocs/prot2pept" },
    { name: "peptfilter", link: "/clidocs/peptfilter" },
    { name: "unipept pept2lca", link: "/clidocs/pept2lca" },
    { name: "unipept pept2prot", link: "/clidocs/pept2prot" },
    { name: "unipept pept2taxa", link: "/clidocs/pept2taxa" },
    { name: "unipept pept2ec", link: "/clidocs/pept2ec" },
    { name: "unipept pept2go", link: "/clidocs/pept2go" },
    { name: "unipept pept2interpro", link: "/clidocs/pept2interpro" },
    { name: "unipept pept2funct", link: "/clidocs/pept2funct" },
    { name: "unipept peptinfo", link: "/clidocs/peptinfo" },
    { name: "unipept taxa2lca", link: "/clidocs/taxa2lca" },
    { name: "unipept taxa2tree", link: "/clidocs/taxa2tree" },
    { name: "unipept taxonomy", link: "/clidocs/taxonomy" }
];
</script>
