<template>
    <HeaderBodyCard title="Latest versions">
        <template>
            <v-navigation-drawer
                class="my-n4"
                width="100%"
                permanent
            >
                <v-list>
                    <v-list-item class="pa-0" v-for="item in services" :key="item.name" :to="item.to" link>
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content class="fixed-flex-size">
                            <v-list-item-title>{{ item.name }}</v-list-item-title>
                        </v-list-item-content>

                        <v-spacer />

                        <v-chip v-if="item.version"
                            class="ma-2 mb-0 justify-left"
                            small
                            label
                            color="primary"
                        >
                            {{ item.version }}
                        </v-chip>
                        <v-chip v-else
                            class="ma-2 mb-0"
                            small
                            label
                        >
                            NA
                        </v-chip>

                        <v-spacer />

                        <v-list-item-icon>
                            <v-icon>mdi-chevron-right</v-icon>
                        </v-list-item-icon>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
        </template>
    </HeaderBodyCard>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import HeaderBodyCard from "./HeaderBodyCard.vue";

export type Service = {
    name: string,
    icon: string,
    version: string,
    to: string
}

export interface Props {
    services: Service[]
}

const { services } = defineProps<Props>();
</script>

<style scoped>
.fixed-flex-size {
    flex: 0 0 100px;
}
</style>
