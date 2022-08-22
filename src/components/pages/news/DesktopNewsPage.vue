<template>
    <v-container>
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

        <v-container v-if="releases.length > 5" class="pa-0 d-flex justify-end">
            <a href="https://github.com/unipept/unipept/releases" target="_blank">View all releases on github</a>
        </v-container>
    </v-container>
</template>

<script setup lang="ts">
import { GithubCommunicator, GithubRelease } from '@/logic/communicators/github/GithubCommunicator';
import { ref, onBeforeMount } from 'vue';

const githubCommunicator = new GithubCommunicator();

const releases = ref<GithubRelease[]>([]);

console.log(releases);

onBeforeMount(async () => {
    const result = await githubCommunicator.releases("https://api.github.com/repos/unipept/unipept-desktop/releases", 5);

    releases.value = result.filter(r => !r.prerelease);
})
</script>
