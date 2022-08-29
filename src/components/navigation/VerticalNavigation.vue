<template>
    <v-tabs vertical slider-size="3" color="secondary">
        <div v-for="item in items" :key="item.name">
            <v-tab :to="item.link" @change="active = item.name" exact-path>
                {{ item.name }}
            </v-tab>
            <div class="sub-tabs" v-if="active == item.name">
                <div v-for="child in item.children" class="v-tab-child" :key="child.name">
                    <v-tab v-if="child.anchor" @click="scroll(child.link)">
                        {{ child.name }}
                    </v-tab>
                    <v-tab v-else :to="child.link" exact-path>
                        {{ child.name }}
                    </v-tab>
                </div>
            </div>
        </div>
    </v-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';

export type NavigationItem = {
    name: string,
    link: string,
    anchor: boolean,
    children: NavigationItem[]
};

export interface Props {
    items: [NavigationItem]
}

/* eslint-disable */
const props = defineProps<Props>();

const active = ref(props.items[0].name);

const scroll = (destination: string) => {
    document.getElementById(destination)?.scrollIntoView({ behavior: 'smooth' });
}
</script>

<style scoped>
.v-tab {
    justify-content: start;
    text-align: start;
    padding-left: 5%;
    text-transform: none;
    max-height: 35px;
}

.v-tabs /deep/ .v-slide-group__wrapper {
    overflow: visible !important;
}

.v-tab-child {
    padding-left: 15%;
    font-size: 75% !important;
}

@keyframes tabs-grow {
    from {
        max-height: 0px;
    }
  
    to {
        max-height: 200px;
    }
}

.sub-tabs {
    overflow: hidden;
    animation-name: tabs-grow;
    animation-duration: 1s;
}
</style>
