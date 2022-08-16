<template>
    <v-container>
        <v-row>
            <v-col>
                <h2>Welcome</h2>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "HomePage",
    setup() {
        const x: string = "value";
        console.log(x);
    }
});
</script>

<style scoped>

</style>
