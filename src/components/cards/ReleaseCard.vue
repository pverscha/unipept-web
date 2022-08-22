<template>
    <div>
        <a :href="release.html_url" target="_blank">
            <v-hover>
                <template v-slot:default="{ hover }">
                    <v-card :hover="hover">
                        <v-card-title class="blue white--text">Unipept {{ release.tag_name }}</v-card-title>
                        <v-card-subtitle class="blue white--text">Posted on {{ formatDate(release.published_at) }}</v-card-subtitle>

                        <v-card-text class="mt-4">
                            <v-row v-for="(item, i) in changelog" :key="i">
                                <v-col class="d-flex justify-md-end pa-0" cols=12 md=2>
                                    <v-chip
                                        v-if="item.tag"
                                        class="ma-2 mb-0"
                                        :class="item.tag"
                                        x-small
                                        label
                                    >
                                        {{ item.tag }}
                                    </v-chip>
                                    <v-chip
                                        v-else
                                        class="ma-2"
                                        x-small
                                        label
                                    >
                                        NA
                                    </v-chip>
                                </v-col>
                                <v-col class="pa-0 my-0 my-md-1 ps-2" cols=12 md=10>
                                    {{ item.description }}
                                </v-col>
                            </v-row>
                        </v-card-text>

                        <slot name="extension"></slot>
                    </v-card>
                </template>
            </v-hover>
        </a>
    </div>
</template>

<script setup lang="ts">
import { GithubRelease } from '@/communicators/github/GithubCommunicator';

export interface Props {
    release: GithubRelease
}

/* eslint-disable */
const { release } = defineProps<Props>()

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
}

const splitTag = (item: string) => {
    // Because not all releases have tags
    if(!item.startsWith("[")) {
        return {tag: null, description: item};
    }

    const [tag, ...text] = item.split(" ");

    return {tag: tag.replace(/^\[/, "").replace(/\]$/, "").toLowerCase(), description: text.join(" ").trimEnd()};
}

const changelog = release.body
    .trim()
    .replace(/- /g, "* ")
    .split('* ')
    .filter(item => item.length)
    .map(splitTag)
</script>

<style scoped>
a {
    text-decoration: none;
}

.added {
    background-color: #00a82d !important;
    color: white !important;
    font-weight: 800 !important;
    text-transform: uppercase;
    align-content: center;
}

.improved,
.updated {
    background-color: #2196F3 !important;
    color: white !important;
    font-weight: 800 !important;
    text-transform: uppercase;
    align-content: center;
}

.removed,
.fixed {
    background-color: red !important;
    color: white !important;
    font-weight: 800 !important;
    text-transform: uppercase;
    align-content: center;
}
</style>