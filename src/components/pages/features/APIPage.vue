<template>
    <v-container>
        <v-row class="mt-5">
            <div class="col-10">
                <router-view></router-view>
            </div>
            <div class="col-2">
                <VerticalNavigation :items="navigation">

                </VerticalNavigation>
            </div>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VerticalNavigation from "@/components/navigation/VerticalNavigation.vue";

export default defineComponent({
    name: "APIPage",
    setup() { },
    components: { VerticalNavigation },
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
                { name: "pept2info", link: "/apidocs/pept2info" },
                { name: "taxa2lca", link: "/apidocs/taxa2lca" },
                { name: "taxa2tree", link: "/apidocs/taxa2tree" },
                { name: "taxonomy", link: "/apidocs/taxonomy" }
            ]
        }
    }
});
</script>
