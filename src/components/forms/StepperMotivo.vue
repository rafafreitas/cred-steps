<template>
    <div>
        <v-card class="mb-5" height="auto">
            <p class="stepper-text-p">
                Cada item respondido ajuda seu empréstimo a ser aprovado.
            </p>
            <p class="stepper-text-parc">
                Parcelas entre: *
                <br/>
                <label class="stepper-label-parc">
                    <!--R$ {{firstParcel}} e R$ {{secondParcel}}-->
                </label>
            </p>
            <div class="card-content">

                <v-layout row xs12 wrap>
                    <v-flex xs12 sm12>
                        <label>
                            Quanto o motivo do empréstimo? <br>
                        </label>
                    </v-flex>

                    <v-flex xs12 sm12>

                        <v-radio-group
                                v-model="itens.radios"
                                :mandatory="false"
                                v-validate="'required'"
                                data-vv-name="motivo"
                                :error-messages="errors.collect('motivo')" >
                            <v-layout row xs12 wrap>
                                <v-flex xs12 sm6 class="container-flex">
                                    <v-radio label="Tratamento Médico" value="1"></v-radio>
                                    <v-radio label="Tratamento Odontológico" value="2"></v-radio>
                                    <v-radio label="Construção/Reforma ou Decoração" value="3"></v-radio>
                                    <v-radio label="Viagem" value="4"></v-radio>
                                    <v-radio label="Festa/Casamento" value="5"></v-radio>
                                    <v-radio label="Pagar uma dívida" value="6"></v-radio>
                                </v-flex>

                                <v-flex xs12 sm6>
                                    <v-radio label="Empréstimo Pessoal" value="7"></v-radio>
                                    <v-radio label="Pagar Cartão de Crédito" value="8"></v-radio>
                                    <v-radio label="Pagar Cheque Especial" value="9"></v-radio>
                                    <v-radio label="Curso ou Intercâmbio" value="10"></v-radio>
                                    <v-radio label="Outro" value="11"></v-radio>
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
                            <v-dialog
                                    ref="dialog"
                                    v-model="modal"
                                    :return-value.sync="itens.datepicker"
                                    persistent
                                    lazy
                                    full-width
                                    width="290px"
                                    key="input-motivo-festa"
                            >
                                <v-text-field
                                        slot="activator"
                                        v-validate="'required|dateAfter'"
                                        v-model="compDateFormated"
                                        :rules="[() => validInput(compDateFormated) || error]"
                                        :error-messages="errors.collect('Data')"
                                        data-vv-name="Data"
                                        label="Data da festa"
                                        prepend-icon="event"
                                        readonly
                                ></v-text-field>
                                <v-date-picker v-model="itens.datepicker" scrollable locale="pt-br">
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="primary" @click="modal = false">Cancelar</v-btn>
                                    <v-btn flat color="primary" @click="$refs.dialog.save(itens.datepicker)">OK</v-btn>
                                </v-date-picker>
                            </v-dialog>
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
                        <v-checkbox v-validate="'required'" data-vv-name="credito" :error-messages="errors.collect('credito')" class="container-checkbox" v-model="itens.checkbox" label="Crédito Consignado P/ Aposentado, Pensionista, Funcionário Público ou Forças Armadas" value="1"></v-checkbox>
                        <v-checkbox v-validate="'required'" data-vv-name="credito" :error-messages="errors.collect('credito')" class="container-checkbox" v-model="itens.checkbox" label="Pelo Limite do Cartão de Crédito." value="2"></v-checkbox>
                        <div v-if="itens.checkbox.includes('2')" >
                            <label>
                                Qual o limite?<br>
                            </label>
                            <v-text-field
                                    v-validate="'required'"
                                    class="text-field-limite"
                                    v-model="itens.limite"
                                    :rules="[() => validInput(itens.limite) || error]"
                                    :error-messages="errors.collect('limite')"
                                    data-vv-name="limite"
                                    v-money
                                    required
                            ></v-text-field>
                            <p class="error-credito" v-if="showError">Informe o valor do limite.</p>


                        </div>
                        <v-checkbox v-validate="'required'" data-vv-name="credito" :error-messages="errors.collect('credito')" class="container-checkbox" v-model="itens.checkbox" label="Desconto em Folha de Pagamento " value="3"></v-checkbox>
                        <v-checkbox v-validate="'required'" data-vv-name="credito" :error-messages="errors.collect('credito')" class="container-checkbox" v-model="itens.checkbox" label="Cheque" value="4"></v-checkbox>
                        <v-checkbox v-validate="'required'" data-vv-name="credito" :error-messages="errors.collect('credito')" class="container-checkbox" v-model="itens.checkbox" label="Boleto" value="5"></v-checkbox>
                        <v-checkbox v-validate="'required'" data-vv-name="credito" :error-messages="errors.collect('credito')" class="container-checkbox" v-model="itens.checkbox" label="Débito em Conta" value="6"></v-checkbox>

                        <p class="error-credito" v-if="checkArray">Informe como pretende conseguir o crédito!</p>
                    </v-flex>

                </v-layout>

            </div>

        </v-card>

        <v-btn color="primary" @click="nextPage(3)" >
            Continuar
        </v-btn>

        <v-btn flat>Cancel</v-btn>
    </div>
</template>

<script>
    import myDictionary from '../../validations/dicionary'
    export default {
        name: "Page-2",
        data: () => ({
            error:"",
            errorCredito: false,
            showError: false,
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
            compDateFormated: function () {
                return this.formatDate(this.itens.datepicker)
            },
            checkArray: function () {
                if (this.itens.checkbox.length === 0 && this.errorCredito){
                    return true
                }else{
                    return false
                }
            }
        },
        methods: {
            nextPage(page){
                this.$validator.validateAll().then((result) =>{
                    console.log('Validate Motivo', result)
                    if (result && this.checkMoney()) {
                        this.$store.commit('setStepperMotivo', this.itens)
                        this.$emit('alterTab', page)

                    }else{
                        if (this.itens.checkbox.length === 0){
                            this.errorCredito = true;
                        }

                    }
                })
            },
            formatDate (date) {
                if (!date) return null
                const [year, month, day] = date.split('-')
                return `${day}/${month}/${year}`
            },
            validInput(input){
                if (input){
                    return true
                } else{
                    return false
                }
            },
            checkMoney(){
                if (this.itens.limite.includes("R$")){
                    if (this.itens.limite === 'R$ 0,00' && this.itens.checkbox.includes('2')){
                        this.showError = true
                        return false
                    }else{
                        this.showError = false
                        return true
                    }
                }else{
                    return true
                }
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