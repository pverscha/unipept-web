<template>
    <v-app>
        <v-app-bar
            app
            color="secondary"
            dark
            hide-on-scroll
            class="px-lg-16"
        >
            <h2>
                <router-link to="/" class="homepage-title">
                    Unipept
                </router-link>
            </h2>

            <v-spacer></v-spacer>

            <v-btn text>
                Publications
            </v-btn>
            <router-link to="/about" v-slot="{ href, navigate }">
                <v-btn text @click="navigate" :href="href">
                    About
                </v-btn>
            </router-link>

            <template v-slot:extension>
                <v-tabs slider-size="5" optional>
                    <v-tab class="pa-0 ma-0" style="min-width:0px" />
                    <v-tab v-for="item in navItems" :key="item.name" :to="item.path" class="white--text font-weight-bold">
                        {{ item.name }}
                    </v-tab>
                </v-tabs>
            </template>
        </v-app-bar>

        <v-content>
            <v-container class="main-container">
                <router-view></router-view>
            </v-container>
        </v-content>

        <v-footer dark padless class="grey darken-3 px-lg-16 flex">
            <div class="d-flex flex-wrap" style="width: 100%">
                <div v-if="$route.meta" class="col-md-8 text-md-start order-md-0 col-12 text-center order-2 grey--text d-md-flex">
                    <div class="flex-md-column">
                        {{ $route.meta.publication }}
                    </div>
                    <div class="flex-md-column">
                        <a class="link" :href="'https://' + $route.meta.publicationLink" target="_blank">&nbsp;{{ $route.meta.publicationLink }}</a>
                    </div>
                </div>
                <div v-else class="col-md-8 text-md-start order-md-0 col-12 text-center order-2 grey--text d-md-flex"></div>
                <div class="col-md-4 text-md-end order-md-1 col-12 text-center order-0">
                    <a class="link" href="mailto:unipept@ugent.be">
                        <v-icon size="30px" class="grey--text link">
                            mdi-email-outline
                        </v-icon>
                    </a>
                    <a class="ml-10 link" href="https://twitter.com/unipept" target="_blank">
                        <v-icon size="30px" class="grey--text link">
                            mdi-twitter
                        </v-icon>
                    </a>
                    <a class="ml-10 link" href="https://github.com/unipept/unipept" target="_blank">
                        <v-icon size="30px" class="grey--text link">
                            mdi-github
                        </v-icon>
                    </a>
                </div>
                <div class="col-md-8 text-md-start order-md-2 col-12 text-center order-3 grey--text">© 2022 Universiteit Gent</div>
                <div class="col-md-4 text-md-end order-md-3 col-12 text-center order-1">
                    <router-link class="link" to="/about">Terms of service</router-link>
                    <router-link class="link ml-5" to="/posts">News</router-link>
                    <router-link class="link ml-5" to="/">Publications</router-link>
                </div>
            </div>
        </v-footer>
    </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "App",
    data() {
        return {
            navItems: [
                { name: "Tryptic Peptide Analysis", path: "/tpa" },
                { name: "Metaproteomics Analysis", path: "/mpa" },
                { name: "API", path: "/apidocs" },
                { name: "CLI", path: "/clidocs" },
                { name: "Metagenomics", path: "/umgap" },
                { name: "Unipept Desktop", path: "/desktop" }
            ]
        }
    }
});
</script>

<style lang="scss">
@import '~vuetify/src/styles/settings/_variables';

@media #{map-get($display-breakpoints, 'md-and-down')} {
    .main-container {
        width: 100% !important;
    }
}

@media #{map-get($display-breakpoints, 'lg-and-up')} {
    .main-container {
        width: 75% !important;
    }
}

.homepage-title {
    color: white !important;
    text-decoration: none;
}

.v-slide-group__prev {
    display: none !important;
}

.link {
    color: #9e9e9e !important;
    text-decoration: none;
}

.link:hover {
    color: white !important;
    text-decoration: none;
}

.v-card__text {
    color: #333333 !important;
}

li {
    line-height: 1.8;
}

.v-card__text p {
    font-size: 100%;
}

.v-card__content p {
    font-size: 100%;
}

p {
    color: #333333 !important;
    font-size: 90%;
    margin-bottom: 8px !important;
}

.v-card h3 {
    font-weight: 300;
    font-size: large;
}

.v-card h2 {
    font-weight: 300;
    font-size: x-large;
}

.v-alert__wrapper {
    display:block !important;
}
</style>
