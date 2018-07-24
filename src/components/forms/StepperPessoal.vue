<template>
    <div>
        <v-card class="mb-5" height="auto">
            <p class="stepper-text-p">
                Essas informações serão importantes para podermos te ajudar!
            </p>
            <div class="card-content" >

                <v-layout row xs12 wrap>
                    <v-flex xs12 sm6 class="container-flex">
                        <label>
                            Quanto você precisa? <br>
                            <b>R$ {{(page1.initialValue).toLocaleString('pt-BR')}},00 </b>
                        </label>
                        <v-slider
                                class="slider-valor"
                                v-model="page1.initialValue"
                                thumb-size="40"
                                thumb-label
                                min="500"
                                max="10000"
                                step="250"
                        ></v-slider>
                    </v-flex>

                    <v-flex xs12 sm6>
                        <label>
                            Em quantas parcelas? <br><br>
                            <b></b>
                        </label>
                        <v-select
                                v-model="page1.parcela"
                                :items="page1.parcelas"
                                label="Parcelas"
                        ></v-select>
                    </v-flex>
                </v-layout>

                <p class="stepper-text-parc">
                    Parcelas entre: *
                    <br/>
                    <label class="stepper-label-parc">
                        R$ {{firstParcel}} e R$ {{secondParcel}}
                    </label>
                </p>

                <v-text-field
                        v-validate="'required'"
                        v-model="page1.nome"
                        :rules="[() => validInput(page1.nome) || error]"
                        :error-messages="errors.collect('name')"
                        data-vv-name="name"
                        label="Nome"
                        placeholder="Informe seu nome completo."
                        required
                ></v-text-field>


                <v-text-field
                        v-validate="'required'"
                        v-model="page1.telefone"
                        :rules="[() => validInput(page1.telefone) || error]"
                        :error-messages="errors.collect('telefone')"
                        data-vv-name="telefone"
                        placeholder="(__) ____-____"
                        label="Telefone"
                        mask="(##) #####-####"
                        required
                ></v-text-field>

                <v-text-field
                        v-validate="'required'"
                        v-model="page1.cpf"
                        :rules="[() => validInput(page1.cpf) || error]"
                        :error-messages="errors.collect('cpf')"
                        data-vv-name="cpf"
                        placeholder="___.___.___-__"
                        label="CPF"
                        mask="###.###.###-##"
                        required
                ></v-text-field>

                <v-dialog
                        ref="dialog"
                        v-model="modal"
                        :return-value.sync="page1.nascimento"
                        persistent
                        lazy
                        full-width
                        width="290px"
                >
                    <v-text-field
                            slot="activator"
                            v-validate="'required'"
                            v-model="page1.nascimento"
                            :rules="[() => validInput(page1.nascimento) || error]"
                            :error-messages="errors.collect('nascimento')"
                            data-vv-name="nascimento"
                            label="Data de Nascimento"
                            prepend-icon="event"
                            readonly
                    ></v-text-field>
                    <v-date-picker v-model="page1.nascimento" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.dialog.save(page1.nascimento)">OK</v-btn>
                    </v-date-picker>
                </v-dialog>


            </div>
        </v-card>

        <v-btn color="primary" @click="nextPage(2)">
            Continuar
        </v-btn>

        <p class="stepper-text-footer">
            * Os valores apresentados acima são apenas fins comparativos.
            Para calcular a sua taxa real clique em "Continuar" e finalize
            seu pedido sem compromisso
        </p>
    </div>
</template>

<script>
    export default {
        name: "Page-1",
        data: () => ({
            modal: false,
            error:"",
            page1:{
                initialValue: 5000,
                parcelas: [
                    '12 Parcelas',
                    '18 Parcelas',
                    '24 Parcelas',
                    '30 Parcelas',
                    '36 Parcelas'
                ],
                parcela: "12 Parcelas",
                nome: "",
                telefone: "",
                cpf: "",
                nascimento: "",
            },
            dictionary: {
                custom: {
                    name: {
                        required: () => 'O nome deve ser informado!',
                    },
                    telefone: {
                        required: () => 'Informe seu telefone!',
                        min: 'Informe um número válido!'
                    },
                    cpf: {
                        required: () => 'Informe seu CPF!',
                        min: 'Informe um CPF válido!'
                    },
                    nascimento: {
                        required: () => 'Informe a data de nascimento!',
                    }
                }
            }
        }),
        mounted () {
            this.$validator.localize('en', this.dictionary)
        },
        computed: {
            firstParcel: function () {
                return this.calcularJuros(0.008)

            },
            secondParcel: function () {
                return this.calcularJuros(0.05)
            },
        },
        methods: {
            validInput(input){
                if (input){
                    return true
                } else{
                    this.error = 'Este campo é obrigatório!'
                    return false
                }
            },
            nextPage(page){
                this.$validator.validateAll().then((result) =>{
                    console.log('Validate Scope', result)
                    if (result) {
                        this.e1 = page
                    }else{
                        // this.e1 = page
                    }
                })
            },
            calcularJuros(taxa){
                let qtd = parseInt(this.page1.parcela.split(" "))
                let valor = this.page1.initialValue
                let juros = (valor * taxa * qtd );

                return ((valor + juros) / qtd).toFixed(2).replace(".",",");
            }
        }
    }
</script>

<style lang="scss">
    .card-content{
        margin-top: 25px;
        padding: 15px;
    .slider-valor{
        padding: 5px;
        padding-right: 20px;
        margin-top: 27px;
    }
    .container-checkbox{
        margin-top: 0px;
    }
    .card-content-row-credito{
        margin-top: 30px;
    }
    }

</style>