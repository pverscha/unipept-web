<template>
    <v-app>
        <v-app-bar
          app
          color="secondary"
          dark
        >
            <h2 class="ml-4">Unipept</h2>
            <v-spacer></v-spacer>
            <v-btn text>
                Publications
            </v-btn>
            <v-btn text>
                About
            </v-btn>

            <template v-slot:extension>
                <v-tabs align-with-title>
                    <v-tab>Typtic Peptide Analysis</v-tab>
                    <v-tab>Metaproteomics Analysis</v-tab>
                    <v-tab>API</v-tab>
                    <v-tab>CLI</v-tab>
                    <v-tab>Metagenomics</v-tab>
                    <v-tab>Unipept Desktop</v-tab>
                </v-tabs>
            </template>
        </v-app-bar>

        <v-main>
        </v-main>
    </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {},

  data: () => ({
    //
  }),
};
</script>
