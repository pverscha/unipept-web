<template>
    <router-link v-if="router" class="link" :to="to"><slot></slot></router-link>
    <span v-else-if="anchor" class="link" @click="scroll(to)"><slot></slot></span>
    <a v-else class="link" :href="to" target="_blank"><slot></slot></a>
</template>

<script setup lang="ts">
export interface Props {
    to: string,
    router?: boolean,
    anchor?: boolean
}

const scroll = (destination: string) => {
    document.getElementById(destination)?.scrollIntoView({ behavior: 'smooth' });
}

/* eslint-disable */
withDefaults(defineProps<Props>(), {
    router: false,
    anchor: false
})
</script>

<style scoped>
.link {
    text-decoration: none;
    color: #2196F3 !important;
    cursor: pointer;
}

.link:hover {
    text-decoration: underline;
    color: #2196F3 !important;
}
</style>
