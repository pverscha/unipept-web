<template>
    <pre v-html="jsonParser.parseAndHighlight(object)"></pre>
</template>

<script setup lang="ts">
import JsonParser from '@/logic/parsers/json/JsonParser';

export interface Props {
    object: Object | [Object]
}

/* eslint-disable */
defineProps<Props>();

const jsonParser = new JsonParser();
</script>

<style scoped>
span {
    text-transform: uppercase;
    font-size: 90%;
};
</style>
