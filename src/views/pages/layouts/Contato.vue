<template>
    <div class="container-contato">
        <v-stepper v-model="tab">
            <v-stepper-header>
                <v-stepper-step :complete="tab > 1" step="1">Crédito</v-stepper-step>
                <v-divider></v-divider>

                <v-stepper-step :complete="tab > 2" step="2">Motivo/Ocupação</v-stepper-step>
                <v-divider></v-divider>

                <v-stepper-step :complete="tab > 3" step="3">Dados adicionais</v-stepper-step>
                <v-divider></v-divider>

                <v-stepper-step step="4">Finalize</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content step="1">
                    <page-1 @alterTab="alterEl" @backE1="backE1"></page-1>
                </v-stepper-content>
                <v-stepper-content step="2">
                    <page-2 @alterTab="alterEl" @backE1="backE1"></page-2>
                </v-stepper-content>
                <v-stepper-content step="3">
                    <Page-3 @alterTab="alterEl" @backE1="backE1"></Page-3>
                </v-stepper-content>
                <v-stepper-content step="4">
                    <Page-4 @finish="finish"></Page-4>
                </v-stepper-content>

            </v-stepper-items>
        </v-stepper>
    </div>
</template>

<script>
    import Page1 from "../../../components/forms/StepperPessoal";
    import Page2 from "../../../components/forms/StepperMotivo";
    import Page3 from "../../../components/forms/StepperAdicionais";
    import Page4 from "../../../components/forms/StepperFinalize";
    export default {
        name: "Contato",
        components: {Page1,Page2,Page3,Page4},
        data: () => ({
            tab: 1,
        }),
        mounted() {
            this.callApi()
            this.$store.commit('setRouterForm', this.verifyRouter)
        },
        computed: {
          verifyRouter: function () {
            if (this.$router.currentRoute.name === 'Formulario2' ){
              return 2
            } else {
              return 1
            }
          }
        },
        methods: {
            alterEl(page) {
              this.$store.commit('hasLoadingG', true)
              switch (page){
                case 2:
                  this.$store.dispatch('initContext')
                    .then(result => {
                      this.$store.commit('hasLoadingG', false)
                      this.tab = page
                    })
                    .catch(err => {
                      this.$store.commit('hasLoadingG', false)
                      this.$store.commit('hasAlertError', true, page-1)
                      setTimeout(function(){this.$store.commit('hasAlertError', false, page-1)}, 2000);
                    })
                  break
                case 3:
                  this.$store.dispatch('reasonContext')
                    .then(result => {
                      this.$store.commit('hasLoadingG', false)
                      this.tab = page
                    })
                    .catch(err => {
                      this.$store.commit('hasLoadingG', false)
                      this.$store.commit('hasAlertError', true, page-1)
                      setTimeout(function(){this.$store.commit('hasAlertError', false, page-1)}, 2000);
                    })
                  break
                case 4:
                  this.$store.dispatch('additionalContext')
                    .then(result => {
                      this.$store.commit('hasLoadingG', false)
                      this.tab = page
                    })
                    .catch(err => {
                      this.$store.commit('hasLoadingG', false)
                      this.$store.commit('hasAlertError', true, page-1)
                      setTimeout(function(){this.$store.commit('hasAlertError', false, page-1)}, 2000);
                    })
                  break
              }
            },
            backE1(page){
                this.tab = page
            },
            finish(){
              this.$store.commit('hasLoadingG', true)
              this.$store.dispatch('finalContext')
                .then(result => {
                  this.$store.commit('hasLoadingG', false)
                  this.$router.push('/finish')
                })
                .catch(err => {
                  this.$store.commit('hasLoadingG', false)
                  this.$store.commit('hasAlertError', true, 4)
                  setTimeout(function(){this.$store.commit('hasAlertError', false, 4)}, 2000);
                })

            },
            callApi(){
                this.$store.dispatch('getStates')
                    .then(result => {
                    })
                    .catch(err => {
                    })
                this.$store.dispatch('getBanks')
                  .then(result => {
                  })
                  .catch(err => {

                  })
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
