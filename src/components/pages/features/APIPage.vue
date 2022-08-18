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
                { name: "pept2taxa", link: "" },
                { name: "pept2lca", link: "" },
                { name: "pept2ec", link: "" },
                { name: "pept2go", link: "" },
                { name: "pept2interpro", link: "" },
                { name: "pept2funct", link: "" },
                { name: "pept2info", link: "" },
                { name: "taxa2lca", link: "" },
                { name: "taxa2tree", link: "" },
                { name: "taxonomy", link: "" }
            ]
        }
    }
});
</script>
