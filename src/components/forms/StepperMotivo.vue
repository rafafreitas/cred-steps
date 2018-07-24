<template>
    <div>
        <v-card class="mb-5" height="auto" data-vv-scope="page2">
            <p class="stepper-text-p">
                Cada item respondido ajuda seu empréstimo a ser aprovado.
            </p>
            <p class="stepper-text-parc">
                Parcelas entre: *
                <br/>
                <label class="stepper-label-parc">
                    R$ {{firstParcel}} e R$ {{secondParcel}}
                </label>
            </p>
            <div class="card-content">
                <v-layout row xs12 wrap>
                    <v-flex xs12 sm12>
                        <label>
                            Quanto o motivo do empréstimo? <br>
                        </label>
                    </v-flex>
                    <v-flex xs12 sm6 class="container-flex">
                        <v-radio-group v-model="page2.radios" :mandatory="false">
                            <v-radio label="Tratamento Médico" value="1"></v-radio>
                            <v-radio label="Tratamento Odontológico" value="2"></v-radio>
                            <v-radio label="Construção/Reforma ou Decoração" value="3"></v-radio>
                            <v-radio label="Viagem" value="4"></v-radio>
                            <v-radio label="Festa/Casamento" value="5"></v-radio>
                            <v-radio label="Pagar uma dívida" value="6"></v-radio>
                        </v-radio-group>
                    </v-flex>

                    <v-flex xs12 sm6>
                        <v-radio-group v-model="page2.radios" :mandatory="false">
                            <v-radio label="Empréstimo Pessoal" value="7"></v-radio>
                            <v-radio label="Pagar Cartão de Crédito" value="8"></v-radio>
                            <v-radio label="Pagar Cheque Especial" value="9"></v-radio>
                            <v-radio label="Curso ou Intercâmbio" value="10"></v-radio>
                            <v-radio label="Outro" value="radio-2"></v-radio>
                        </v-radio-group>
                    </v-flex>
                </v-layout>

                <div v-if="page2.radios == parseInt(1) || page2.radios == parseInt(2)" >
                    <label>
                        Qual o tratamento? <br><br>
                    </label>
                    <v-text-field
                            v-validate="'required'"
                            v-model="page2.tratamento"
                            :rules="[() => validInput(page2.tratamento) || error]"
                            :error-messages="errors.collect('tratamento')"
                            data-vv-name="tratamento"
                            placeholder="Descreva o procedimento."
                            label="Tratamento"
                            required
                    ></v-text-field>
                </div>

                <div v-if="page2.radios == parseInt(5)" >
                    <label>
                        Qual a data da Festa/Casamento? <br><br>
                    </label>
                    <v-date-picker v-model="page2.datepicker" locale="pt-br"></v-date-picker>
                </div>

                <v-layout class="card-content-row-credito" row xs12 wrap>
                    <v-flex xs12 sm12>
                        <label>
                            Como pretende conseguir o crédito? <br>
                        </label>
                    </v-flex>
                    <v-flex xs12 sm12 class="container-flex">
                        <v-checkbox class="container-checkbox" v-model="page2.checkbox" label="Crédito Consignado P/ Aposentado, Pensionista, Funcionário Público ou Forças Armadas" value="1"></v-checkbox>
                        <v-checkbox class="container-checkbox" v-model="page2.checkbox" label="Pelo Limite do Cartão de Crédito." value="2"></v-checkbox>
                        <div v-if="page2.checkbox.includes('2')" >
                            <label>
                                Qual o limite?<br><br>
                            </label>
                            <v-text-field
                                    v-validate="'required'"
                                    v-model="page2.limite"
                                    :rules="[() => validInput(page2.limite) || error]"
                                    :error-messages="errors.collect('limite')"
                                    data-vv-name="tratamento"
                                    label="Limite"
                                    prefix="R$"
                                    required
                            ></v-text-field>
                        </div>
                        <v-checkbox class="container-checkbox" v-model="page2.checkbox" label="Desconto em Folha de Pagamento " value="3"></v-checkbox>
                        <v-checkbox class="container-checkbox" v-model="page2.checkbox" label="Cheque" value="4"></v-checkbox>
                        <v-checkbox class="container-checkbox" v-model="page2.checkbox" label="Boleto" value="5"></v-checkbox>
                        <v-checkbox class="container-checkbox" v-model="page2.checkbox" label="Débito em Conta" value="6"></v-checkbox>
                    </v-flex>

                </v-layout>



            </div>

        </v-card>

        <v-btn color="primary" @click="e1 = 3" >
            Continuar
        </v-btn>

        <v-btn flat>Cancel</v-btn>
    </div>
</template>

<script>
    export default {
        name: "Page-2",
        data: () => ({
            error:"",
            page2:{
                radios: "",
                tratamento: "",
                datepicker: "",
                checkbox: [],
                limite: "",
            },
            dictionary: {
                custom: {
                    tratamento: {
                        required: () => 'Informe o tratamento!',
                    },

                }
            }
        }),
    }
</script>

<style scoped>

</style>