<template>
    <v-container style="width: 75%;"> <!-- TODO: this is fixed in PR #5 and should be removed when merged -->
        <h1 class="font-weight-light">
            News
        </h1>

        <ReleaseCard
            v-for="release in releases"
            class="mb-5"
            :key="release.tag_name"
            :release="release"
        >
        </ReleaseCard>

        <v-container class="pa-0 d-flex justify-end">
            <a href="https://github.com/unipept/unipept/releases" target="_blank">View all releases on github</a>
        </v-container>
    </v-container>
</template>

<script setup lang="ts">
import { GithubCommunicator, GithubRelease } from '@/communicators/github/GithubCommunicator';
import { onBeforeMount, ref } from 'vue';
import ReleaseCard from '../cards/ReleaseCard.vue';

const githubCommunicator = new GithubCommunicator();

const releases = ref<GithubRelease[]>([]);

onBeforeMount(async () => {
    const result = await githubCommunicator.releases(5);

    releases.value = result.filter(r => !r.prerelease);
})
</script>
