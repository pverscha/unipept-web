<template>
    <div>
        <div v-if="!loading">
            <ReleaseCard class="mb-5" :release="latestAPIRelease" :parser="descriptionChangelogParser"></ReleaseCard>
            <ReleaseCard class="mb-5" :release="latestCLIRelease" :parser="descriptionChangelogParser"></ReleaseCard>
            <ReleaseCard class="mb-5" :release="latestWebRelease" :parser="descriptionChangelogParser"></ReleaseCard>
            <ReleaseCard class="mb-5" :release="latestDesktopRelease" :parser="desktopReleaseParser"></ReleaseCard>
        </div>
    </div>
</template>

<script setup lang="ts">
import ReleaseCard from '@/components/cards/ReleaseCard.vue';
import { GithubCommunicator, GithubRelease } from '@/logic/communicators/github/GithubCommunicator';
import DescriptionChangelogParser from '@/logic/parsers/github/DescriptionChangelogParser';
import DesktopReleaseParser from "@/logic/parsers/github/DesktopReleaseParser";
import { onBeforeMount, ref } from 'vue';

const githubCommunicator = new GithubCommunicator();
const descriptionChangelogParser = new DescriptionChangelogParser();
const desktopReleaseParser = new DesktopReleaseParser();

const loading = ref<boolean>(true);
const latestAPIRelease = ref<GithubRelease>();
const latestCLIRelease = ref<GithubRelease>();
const latestWebRelease = ref<GithubRelease>();
const latestDesktopRelease = ref<GithubRelease>();

onBeforeMount(async () => {
    latestAPIRelease.value = await githubCommunicator.latestRelease("https://api.github.com/repos/unipept/unipept/releases");
    latestCLIRelease.value = await githubCommunicator.latestRelease("https://api.github.com/repos/unipept/unipept-cli/releases");
    latestWebRelease.value = await githubCommunicator.latestRelease("https://api.github.com/repos/unipept/unipept-web/releases");
    latestDesktopRelease.value = await githubCommunicator.latestRelease("https://api.github.com/repos/unipept/unipept-desktop/releases");

    loading.value = false;
});
</script>