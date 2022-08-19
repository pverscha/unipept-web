<template>
    <v-card>
        <v-card-text class="mt-4">
            <h4>Example <small>{{ title }}</small></h4>
        </v-card-text>

        <v-card-text>
            <slot name="response"></slot>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
export interface Props {
    title: String,
    response: Object
}

/* eslint-disable */
defineProps<Props>();
</script>
