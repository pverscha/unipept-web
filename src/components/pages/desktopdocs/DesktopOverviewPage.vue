<template>
    <v-container>
        <h1 class="font-weight-light">
            Unipept Desktop documentation <small>v2.0.0-alpha.9</small>
        </h1>
        <h3 class="font-weight-light mb-2">
            The Unipept Desktop application allows, in contrast to the web application, to analyse much larger samples,
            to store analysis results offline, extensively compare assays with each other, better manage
            samples and perform proteogenomics data analyses using targeted protein reference databases.
        </h3>
        <div>
            <p>
                Unipept's web application provides users with the ability to analyze a metaproteomics sample and extract
                taxonomic and functional information from environmental samples. Our web app provides interactive
                visualizations to researchers and allows them to, for example, filter out all functions that are
                associated with a specific taxon. Due to its inherent web-based nature, the size and amount of samples
                that can be analysed are rather limited.
            </p>
            <p>
                The Unipept Desktop application, however, is not limited in the amount of memory and storage that it can
                consume, allowing us to process datasets with much more peptides than before. This a list of all major
                differences between the Unipept desktop app and the web app:
            </p>
            <ul>
                <li>
                    <span class="font-weight-bold">Support for proteogenomics:</span> configure and construct your own
                    targeted protein reference databases that only contain a subset of all the proteins from the
                    UniProtKB resource.
                </li>
                <li>
                    <span class="font-weight-bold">Organise samples in studies and projects:</span> it's now easier than
                    ever to combine and organise samples into studies and projects. One project contains all information
                    required to reconstruct an experiment and can easily be shared with other researchers.
                </li>
                <li>
                    <span class="font-weight-bold">Analyse much larger samples:</span> since the desktop app is not
                    artificially limited in the amount of compute resources that it is allowed to use, it allows you to
                    analyse samples that contain much more peptides (when compared to the web app).
                </li>
                <li>
                    <span class="font-weight-bold">Improved inter- and intra-assay comparison pipeline:</span> the
                    desktop app provides an improved comparative analysis pipline that allows you to compare both
                    features within and between samples. This can help you to improve your insight in the functional
                    or taxonomic shift that might occur in an ecosystem over time.
                </li>
            </ul>

            <p>
                If you use our Unipept Desktop application, then please cite Verschaffelt et al. (2021) Journal of
                Proteome Research:
                <resource-link to="https://academic.oup.com/bioinformatics/article/32/11/1746/1742840?login=false">
                    doi:10.1093/bioinformatics/btw039
                </resource-link>
            </p>
        </div>

        <header-body-card id="installation" title="Installation" class="my-5">
            <p>
                In order to use the Unipept Desktop Application, it needs to be installed first. You can always download
                the most recent version for your operating system from the releases on GitHub. Direct links for the
                different operating systems are also available (these links will always point to the most recent
                version):
            </p>
            <div class="d-flex justify-center">
                <v-btn
                    color="primary"
                    class="mr-5"
                    href="https://github.com/unipept/unipept-desktop/releases/latest/download/Unipept-Desktop.exe">
                    <div class="d-flex align-center">
                        <v-icon>mdi-microsoft-windows</v-icon>
                        <span>Download for Windows</span>
                    </div>
                </v-btn>
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" v-bind="attrs" v-on="on" class="mr-5">
                            <div class="d-flex align-center">
                                <v-icon>mdi-apple</v-icon>
                                <span>Download for macOS</span>
                            </div>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item href="https://github.com/unipept/unipept-desktop/releases/latest/download/Unipept-Desktop-x64.dmg">
                            <v-list-item-title>
                                Mac with Intel Processor (x86, AMD64)
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item href="https://github.com/unipept/unipept-desktop/releases/latest/download/Unipept-Desktop-arm64.dmg">
                            <v-list-item-title>
                                Mac with Apple Silicon Processor (ARM)
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <v-btn
                    color="primary"
                    href="https://github.com/unipept/unipept-desktop/releases/latest/download/Unipept-Desktop.AppImage">
                    <div class="d-flex align-center">
                        <v-icon>mdi-linux</v-icon>
                        <span>Download for Linux</span>
                    </div>
                </v-btn>
            </div>
        </header-body-card>

        <header-body-card id="updates" title="Updates">

        </header-body-card>
    </v-container>
</template>

<script setup lang="ts">
import ResourceLink from '@/components/highlights/ResourceLink.vue';
import HeaderBodyCard from "@/components/cards/HeaderBodyCard.vue";
</script>
