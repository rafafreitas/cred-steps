<template>
    <div class="container-contato">
        <v-stepper v-model="tab">
            <v-stepper-header>
                <v-stepper-step :complete="tab > 1" step="1">Empréstimo Pessoal</v-stepper-step>
                <v-divider></v-divider>

                <v-stepper-step :complete="tab > 2" step="2">Qual o motivo?</v-stepper-step>
                <v-divider></v-divider>

                <v-stepper-step step="3">Finalize</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content step="1">
                    <page-1 @alterTab="alterEl"></page-1>
                </v-stepper-content>
                <v-stepper-content step="2">
                    <page-2></page-2>
                </v-stepper-content>
                <v-stepper-content step="3">
                    <Page-3></Page-3>

                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </div>
</template>

<script>
    import Page1 from "../../../components/forms/StepperPessoal";
    import Page2 from "../../../components/forms/StepperMotivo";
    import Page3 from "../../../components/forms/StepperFinalize";
    export default {
        name: "Contato",
        components: {Page1,Page2,Page3},
        data: () => ({
            tab: 0,
        }),
        methods: {
            alterEl(page) {
                console.log('Cheguei aqui', page)
                // this.tab++
                this.tab = page
            }
        }
    }

</script>

<style scoped lang="scss">
    @media screen and (max-width: 730px){
        .container-contato{
            margin-top: 0px;
        }
    }
</style>