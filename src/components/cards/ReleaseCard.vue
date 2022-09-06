<template>
    <div>
        <v-card v-if="!release.tag_name">
            <v-card-title class="blue white--text">This application has not yet been released</v-card-title>
        </v-card>

        <a v-else :href="release.html_url" target="_blank">
            <v-hover>
                <template v-slot:default="{ hover }">
                    <v-card :hover="hover">
                        <v-card-title class="blue white--text">Unipept {{ release.tag_name.replace(/^v/, "") }}</v-card-title>
                        <v-card-subtitle class="blue white--text">Posted on {{ formatDate(release.published_at) }}</v-card-subtitle>

                        <v-card-text 
                            v-if="changelog.description"
                            class="px-5 pt-5 mb-n7"
                        >
                            {{ changelog.description }}
                        </v-card-text>

                        <v-card-text class="mt-5">
                            <v-row v-for="(item, i) in changelog.changelog" :key="i">
                                <v-col class="d-flex justify-sm-end pa-0" cols=12 sm=2>
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
                                <v-col class="pa-0 my-0 my-sm-1 ps-2 pe-15" cols=12 sm=10>
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
import { GithubRelease } from '@/logic/communicators/github/GithubCommunicator';
import { ReleaseParser } from '@/logic/parsers/github/ReleaseParser';

export interface Props {
    release: GithubRelease,
    parser: ReleaseParser
}

/* eslint-disable */
const { release, parser } = defineProps<Props>()

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
}

const changelog = parser.parse(release.body);

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