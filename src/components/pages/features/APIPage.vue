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

<script lang="ts">
import { defineComponent } from "vue";
import VerticalNavigation from "@/components/navigation/VerticalNavigation.vue";
import HorizontalNavigation from "@/components/navigation/HorizontalNavigation.vue";

export default defineComponent({
    name: "APIPage",
    setup() { },
    components: { VerticalNavigation, HorizontalNavigation },
    data() {
        return {
            navigation: [
                { name: "overview", link: "/apidocs" },
                { name: "pept2prot", link: "/apidocs/pept2prot" },
                { name: "pept2taxa", link: "/apidocs/pept2taxa" },
                { name: "pept2lca", link: "/apidocs/pept2lca" },
                { name: "pept2ec", link: "/apidocs/pept2ec" },
                { name: "pept2go", link: "/apidocs/pept2go" },
                { name: "pept2interpro", link: "/apidocs/pept2interpro" },
                { name: "pept2funct", link: "/apidocs/pept2funct" },
                { name: "peptinfo", link: "/apidocs/peptinfo" },
                { name: "taxa2lca", link: "/apidocs/taxa2lca" },
                { name: "taxa2tree", link: "/apidocs/taxa2tree" },
                { name: "taxonomy", link: "/apidocs/taxonomy" }
            ]
        }
    }
});
</script>
