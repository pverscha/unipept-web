<template>
    <v-card>
            <v-card-text class="mt-4">
                <h4>Example <small>{{ title }}</small></h4>
                <p>
                    <slot name="description"></slot>
                </p>

                <Initialism><b>post</b></Initialism>
                <pre class="request"><b class="sentinel">$</b><slot name="post"></slot></pre>

                <Initialism><b>get</b></Initialism>
                <pre class="request"><slot name="get"></slot></pre>
            </v-card-text>

            <v-divider />

            <v-card-text class="grey lighten-4 limited">
                <h4>Response</h4>
                <Json :object="response"/>
            </v-card-text>
        </v-card>
</template>

<script setup lang="ts">
import Initialism from '@/components/highlights/Initialism.vue';
import Json from '@/components/highlights/Json.vue';

export interface Props {
    title: String,
    response: Object | [Object]
}

/* eslint-disable */
defineProps<Props>();
</script>

<style scoped>
.request {
    display: block;
    border: 1px solid #cccccc;
    border-radius: 2px;
    padding: 8px;
    background-color: #f5f5f5;
    overflow: auto;
    line-height: 0;
    padding: 20px 10px;
    margin-bottom: 12px;
}

.sentinel {
    color: #c65d09;
}

.limited {
    height: 350px;
    overflow: auto;
}
</style>
