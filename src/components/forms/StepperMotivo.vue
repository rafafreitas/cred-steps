<template>
    <div>
        <v-card class="mb-5" height="auto">
            <p class="stepper-text-p">
                Cada item respondido ajudará na aprovação do seu crédito.
            </p>
            <div class="card-content">

                <v-layout row xs12 wrap>
                    <v-flex xs12 sm12>
                        <label>
                            A que se destina o crédito?<br>
                        </label>
                    </v-flex>

                    <v-flex xs12 sm12>

                        <v-radio-group
                                v-model="itens.radios"
                                :mandatory="false"
                                v-validate="'required'"
                                data-vv-name="motivo"
                                :error-messages="errors.collect('motivo')"
                                @change="changeOption()">
                            <v-layout row xs12 wrap>
                                <v-flex xs12 sm6 class="container-flex">
                                    <v-radio label="Tratamento médico" value="1"></v-radio>
                                    <v-radio label="Tratamento odontológico" value="2"></v-radio>
                                    <v-radio v-if="verifyRouter" label="Construção/Reforma ou decoração" value="3"></v-radio>
                                    <v-radio v-if="verifyRouter" label="Viagem" value="4"></v-radio>
                                    <v-radio v-if="verifyRouter" label="Festa/Casamento" value="5"></v-radio>
                                    <v-radio v-if="verifyRouter" label="Pagar uma dívida" value="6"></v-radio>
                                </v-flex>

                                <v-flex xs12 sm6>
                                    <v-radio v-if="verifyRouter" label="Empréstimo pessoal" value="7"></v-radio>
                                    <v-radio v-if="verifyRouter" label="Pagar cartão de crédito" value="8"></v-radio>
                                    <v-radio v-if="verifyRouter" label="Pagar cheque especial" value="9"></v-radio>
                                    <v-radio v-if="verifyRouter" label="Curso ou intercâmbio" value="10"></v-radio>
                                    <v-radio v-if="verifyRouter" label="Outro" value="11"></v-radio>
                                </v-flex>
                            </v-layout>

                        </v-radio-group>
                    </v-flex>

                    <v-flex xs12 sm12>

                        <div v-if="itens.radios == parseInt(1) || itens.radios == parseInt(2)" >
                            <label>
                                Qual o tratamento? <br><br>
                            </label>
                            <v-text-field
                                    v-validate="'required'"
                                    v-model="itens.tratamento"
                                    :rules="[() => validInput(itens.tratamento) || error]"
                                    :error-messages="errors.collect('tratamento')"
                                    data-vv-name="tratamento"
                                    placeholder="Descreva o procedimento."
                                    label="Tratamento"
                                    key="input-motivo-tratamento"
                                    required
                            ></v-text-field>
                        </div>

                        <div v-if="itens.radios == parseInt(5)" >
                            <label>
                                Qual a data da Festa/Casamento? <br><br>
                            </label>
                            <v-text-field
                                    v-validate="'required|dateAfter|date_format:DD/MM/YYYY'"
                                    v-model="itens.datepicker"
                                    :rules="[() => validInput(itens.datepicker) || error]"
                                    :error-messages="errors.collect('Data-Festa')"
                                    data-vv-name="Data-Festa"
                                    label="Data da Festa"
                                    placeholder="__/__/____"
                                    v-mask="'##/##/####'"
                                    type="tel"
                                    @change="checkdate(true)"
                                    prepend-icon="event"
                            ></v-text-field>
                        </div>

                    </v-flex>
                </v-layout>

                <v-layout class="card-content-row-credito" row xs12 wrap>
                    <v-flex xs12 sm12>
                        <label>
                            Como pretende conseguir o crédito? <br>
                        </label>
                    </v-flex>
                    <v-flex xs12 sm12 class="container-flex container-checkbox-credito">
                        <v-checkbox v-validate="'required'" data-vv-name="credito" :error-messages="errors.collect('credito')" class="container-checkbox" v-model="itens.checkbox" label="Crédito consignado para aposentado, pensionista, funcionário público ou forças armadas" value="1"></v-checkbox>
                        <v-checkbox v-validate="'required'" data-vv-name="credito" :error-messages="errors.collect('credito')" class="container-checkbox" v-model="itens.checkbox" label="Pelo limite do cartão de crédito" value="2"></v-checkbox>
                        <div v-if="itens.checkbox.includes('2')" >
                            <v-text-field
                                    v-validate="'required|money'"
                                    class="text-field-limite"
                                    v-model="itens.limite"
                                    :rules="[() => validInput(itens.limite) || error]"
                                    :error-messages="errors.collect('limite')"
                                    data-vv-name="limite"
                                    type="tel"
                                    ref="Valor"
                                    label="Qual o limite?"
                                    v-money
                                    required
                            ></v-text-field>

                        </div>
                        <v-checkbox v-validate="'required'" data-vv-name="credito" :error-messages="errors.collect('credito')" class="container-checkbox" v-model="itens.checkbox" label="Desconto em folha de pagamento" value="3"></v-checkbox>
                        <v-checkbox v-validate="'required'" data-vv-name="credito" :error-messages="errors.collect('credito')" class="container-checkbox" v-model="itens.checkbox" label="Cheque" value="4"></v-checkbox>
                        <v-checkbox v-validate="'required'" data-vv-name="credito" :error-messages="errors.collect('credito')" class="container-checkbox" v-model="itens.checkbox" label="Boleto" value="5"></v-checkbox>
                        <v-checkbox v-validate="'required'" data-vv-name="credito" :error-messages="errors.collect('credito')" class="container-checkbox" v-model="itens.checkbox" label="Débito em conta" value="6"></v-checkbox>

                        <p class="error-credito" v-if="checkArray">Informe como pretende conseguir o crédito!</p>
                    </v-flex>

                </v-layout>

            </div>

        </v-card>

        <Alerts></Alerts>
        <v-btn color="primary" @click="nextPage(3)" :loading="$store.getters.isLoadingG">
            Enviar
        </v-btn>

        <v-btn flat @click="$emit('backE1', 1)">Voltar</v-btn>
    </div>
</template>

<script>
    import myDictionary from '../../validations/dicionary'
    import Alerts from "../Alerts";
    export default {
        name: "Page-2",
        components: {Alerts},
        data: () => ({
            error:"",
            errorCredito: false,
            modal: false,
            itens:{
                radios: null,
                tratamento: "",
                datepicker: "",
                checkbox: [],
                limite: "",
            },
        }),
        mounted () {
            this.$validator.localize('en', myDictionary)
        },
        computed: {
            checkArray: function () {
                if (this.itens.checkbox.length === 0 && this.errorCredito){
                    return true
                }else{
                    return false
                }
            },
            verifyRouter: function () {
              if (this.$router.currentRoute.name === 'Formulario2' ){
                return true
              } else {
                return false
              }
            }
        },
        methods: {
            nextPage(page){
              this.$store.commit('hasErrorMoney', true)
              this.$validator.validateAll().then((result) =>{
                console.log('Validate Motivo', result)
                if (result) {
                  this.$store.commit('setStepperMotivo', this.itens)
                  this.$store.commit('hasErrorMoney', false)
                  this.$emit('alterTab', page)

                }else{
                  if (this.itens.checkbox.length === 0){
                    this.errorCredito = true;
                  }
                    this.$store.commit('hasAlertError', {flag: true, type: 2})
                    setTimeout(()=>{this.$store.commit('hasAlertError', {flag: false, type: 2})}, 3000);
                }
              })
            },
      validInput(input){
                if (input){
                    return true
                } else{
                    return false
                }
            },
            checkdate(flag){
                if (flag) {
                    this.$validator.validate('Data-Festa', this.datepicker).then((result) =>{
                        if (result) {
                            console.log('Data corrigida!')
                        }else{
                            console.log('Data não corrigida!')
                        }
                    })

                }else{
                    this.modal = false
                }

            },
            changeOption(){
              this.itens.tratamento = ""
              this.itens.datepicker = ""
            }
        }
    }
</script>

<style scope lang="scss">
    .error-credito{
        color: #b74343;
        font-size: 9pt;
    }
    .v-text-field__prefix{
        padding-right: 22px!important;
    }
    .container-checkbox-credito .container-checkbox{
        .v-messages{
            display: none!important;
        }
    }

</style>
