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

        <header-body-card id="download" title="Download" class="mt-5">
            <p>
                In order to use the Unipept Desktop Application, it needs to be installed first. You can always download
                the most recent version for your operating system from the releases on GitHub. Direct links for the
                different operating systems are also available (these links will always point to the most recent
                version):
            </p>
            <div class="d-flex justify-center mb-2">
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
            <p>
                Most required dependencies will automatically be installed using the installation packages provided
                above. If a specific installer is not suitable for your current operating system (e.g. specific flavours
                of Linux that do not support AppImage's), you can always clone the repository and build the project
                yourselves.
            </p>
            <v-alert color="warning" outlined>
                <span class="font-weight-bold">Warning:</span>
                If your are planning to use the Unipept Desktop application to build custom targeted protein reference
                databases (which are required for proteogenomics data analyses), then you also need to make sure that
                <a href="https://www.docker.com/products/docker-desktop/">Docker Desktop</a> is installed and working on
                your system.
            </v-alert>
        </header-body-card>

        <header-body-card id="windows_installation" title="Install for Windows" class="mt-5">
            <v-container>
                <v-row>
                    <v-col cols="10">
                        <h3>1. Start the installer package</h3>
                        <p>
                            Double-click the installer package to start the installation. You will be greeted by a
                            window that asks for your explicit approval to install our application. Click "More info".
                        </p>
                    </v-col>
                    <v-col cols="2">
                        <v-img :src="require('@/assets/documentation/desktop/unipept_desktop_windows_1.png')" contain />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="10">
                        <h3>2. Proceed with security checks</h3>
                        <p>
                            A new button appears "Run anyway". Click this button to start the installation process.
                            Windows shows this warning as part of the "SmartScreen Security" system. This system
                            protects your computer from running potentially unsafe apps. Windows displays this message
                            for our application since it's very new, without a large userbase yet. The more people start
                            to use this app, the faster it will be trusted by Microsoft.
                        </p>
                    </v-col>
                    <v-col cols="2">
                        <v-img :src="require('@/assets/documentation/desktop/unipept_desktop_windows_2.png')" contain />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="10">
                        <h3>3. Installation process is started</h3>
                        <p>
                            The installation process is now started, and a progress bar should be visible. This process
                            should not take longer than one minute on most modern systems. Please wait for the installer
                            to disappear (without any errors). Once it's gone, the installation process is fully
                            finished.
                        </p>
                    </v-col>
                    <v-col cols="2">
                        <v-img :src="require('@/assets/documentation/desktop/unipept_desktop_windows_3.png')" contain />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="10">
                        <h3>4. Installation process is done</h3>
                        <p>
                            You can now start the application, by double clicking it's shortcut on your desktop or by
                            selecting it from the applications list in Windows.
                        </p>
                    </v-col>
                    <v-col cols="2">
                        <v-img :src="require('@/assets/documentation/desktop/unipept_desktop_windows_4.png')" contain />
                    </v-col>
                </v-row>
            </v-container>
        </header-body-card>

        <header-body-card id="macos_installation" title="Install for macOS" class="mt-5">
            <v-container>
                <v-row>
                    <v-col cols="10">
                        <h3>1. Mount the installer image</h3>
                        <p>
                            Double-click the downloaded "Unipept.dmg" file to mount the installer image. A new window
                            pops up in which you need to drag the Unipept Desktop logo into your applications folder.
                        </p>
                    </v-col>
                    <v-col cols="2">
                        <v-img :src="require('@/assets/documentation/desktop/unipept_desktop_macos_1.png')" contain />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="10">
                        <h3>2. Installation process is done</h3>
                        <p>
                            Look for the installed application in Launchpad and start Unipept Desktop.
                        </p>
                    </v-col>
                    <v-col cols="2">
                        <v-img :src="require('@/assets/documentation/desktop/unipept_desktop_macos_2.png')" contain />
                    </v-col>
                </v-row>
            </v-container>
        </header-body-card>

        <header-body-card id="linux_installation" title="Install for Linux" class="mt-5">
            <v-container>
                <v-row>
                    <v-col cols="10">
                        <h3>1. Open AppImage properties</h3>
                        <p>
                            Right-click the downloaded "Unipept.AppImage" file and select "properties". A properties
                            window will pop up.
                        </p>
                    </v-col>
                    <v-col cols="2">
                        <v-img :src="require('@/assets/documentation/desktop/unipept_desktop_ubuntu_1.png')" contain />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="10">
                        <h3>2. Enable executable permissions</h3>
                        <p>
                            Click the "permissions" tab and check the box before "Allow executing file as program".
                            Close the window.
                        </p>
                    </v-col>
                    <v-col cols="2">
                        <v-img :src="require('@/assets/documentation/desktop/unipept_desktop_ubuntu_2.png')" contain />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="10">
                        <h3>3. Open the application</h3>
                        <p>
                            Double-click the downloaded AppImage-file to start the application.
                        </p>
                    </v-col>
                    <v-col cols="2">
                        <v-img :src="require('@/assets/documentation/desktop/unipept_desktop_ubuntu_3.png')" contain />
                    </v-col>
                </v-row>
            </v-container>
        </header-body-card>

        <header-body-card id="update" title="Update" class="mt-5">
            <p>
                The Unipept Desktop Application will check for updates automatically. Once an update is found, the new
                version of the application will automatically be downloaded and a progress bar at the bottom of the
                application appears.Once the application is done downloading the new application, the update is
                installed in the background. After the installation finishes, a notification pops up and requests the
                user to restart the application to complete the update.
            </p>
            <p>
                It's not mandatory to restart the application immediately after an update is installed. Note, however,
                that the new version will only take effect after restarting the app.
            </p>
        </header-body-card>
    </v-container>
</template>

<script setup lang="ts">
import ResourceLink from '@/components/highlights/ResourceLink.vue';
import HeaderBodyCard from "@/components/cards/HeaderBodyCard.vue";
</script>
