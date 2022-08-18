<template>
    <v-tabs vertical slider-size="3" color="secondary">
        <v-tab v-for="item in items" :key="item.name" :to="item.link">
            {{ item.name }}
        </v-tab>
    </v-tabs>
</template>

<script setup lang="ts">
export type NavigationItem = {
    name: String,
    link: String
};

export interface Props {
    items: [NavigationItem]
}

/* eslint-disable */
defineProps<Props>()
</script>

<style scoped>
.v-tab {
    justify-content: start;
    text-align: start;
    padding-left: 5%;
}
</style>
