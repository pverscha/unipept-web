<template>
    <v-container>
        <v-row>
            <div class="col-lg-10 order-lg-0 order-1 pt-0">
                <router-view></router-view>
            </div>
            <VerticalNavigation v-if="$vuetify.breakpoint.lgAndUp" class="col-lg-2 order-lg-1 d-sm-none d-lg-flex" :items="navigation" />
            <HorizontalNavigation v-else class="col-12 order-0" :items="navigation" />
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { GithubCommunicator, GithubRelease } from '@/communicators/github/GithubCommunicator';
import { onBeforeMount, ref } from 'vue';
import VerticalNavigation from "@/components/navigation/VerticalNavigation.vue";
import HorizontalNavigation from "@/components/navigation/HorizontalNavigation.vue";

const githubCommunicator = new GithubCommunicator();

const navigation = [
    { name: "overview", link: "/news" },
    { name: "api", link: "/news/api" },
    { name: "cli", link: "/news/cli" },
    { name: "web", link: "/news/web" },
    { name: "desktop", link: "/news/desktop" },
]

const releases = ref<GithubRelease[]>([]);

onBeforeMount(async () => {
    const result = await githubCommunicator.releases(5);

    releases.value = result.filter(r => !r.prerelease);
})
</script>
