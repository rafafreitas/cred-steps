<template>
    <div class="container-contato">
        <v-stepper v-model="e1">
            <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1">Empréstimo Pessoal</v-stepper-step>
                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 2" step="2">Qual o motivo?</v-stepper-step>
                <v-divider></v-divider>

                <v-stepper-step step="3">Finalize</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-card class="mb-5" height="auto">
                        <p class="stepper-text-p">
                            Essas informações serão importantes para podermos te ajudar!
                            <br/>
                            Cada item respondido ajuda seu empréstimo a ser aprovado.
                        </p>
                        <div class="card-content">
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
                                R$ {{firstParcel}} e R$ {{secondParcel}}
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

                        </div>
                    </v-card>

                    <v-btn color="primary" @click="nextPage(2)">
                        Continuar
                    </v-btn>

                </v-stepper-content>

                <v-stepper-content step="2">
                    <v-card class="mb-5" height="200px">

                    </v-card>

                    <v-btn color="primary" @click="e1 = 3" >
                        Continuar
                    </v-btn>

                    <v-btn flat>Cancel</v-btn>
                </v-stepper-content>

                <v-stepper-content step="3">
                    <v-card class="mb-5" height="200px" >

                    </v-card>

                    <v-btn color="primary" @click="e1 = 1">
                        Enviar informações
                    </v-btn>

                    <v-btn flat>Cancel</v-btn>
                </v-stepper-content>

            </v-stepper-items>
        </v-stepper>
    </div>
</template>

<script>
    export default {
        name: "Contato",
        data: () => ({
            e1: 0,
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
                cpf: "",
                telefone: "",
            },
            page2:{},
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
                    console.log(result)
                    if (result) {
                        this.e1 = page
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
    .container-contato{
        max-width: 700px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 40px;
        .card-content{
            margin-top: 25px;
            padding: 15px;


            .slider-valor{
                padding: 5px;
                padding-right: 20px;
                margin-top: 27px;
            }
        }
        .stepper-text-p{
            text-align: center;
        }
        .stepper-text-parc{
            text-align: center;
            margin-bottom: 30px;
        }
    }
    @media screen and (max-width: 730px){
        .container-contato{
            margin-top: 0px;
        }
    }

</style>