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
                            <b>R$ {{(itens.initialValue).toLocaleString('pt-BR')}},00 </b>
                        </label>
                        <v-slider
                                class="slider-valor"
                                v-model="itens.initialValue"
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
                                v-model="itens.parcela"
                                :items="itens.parcelas"
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
                        v-validate="'required|alpha_spaces|min:6'"
                        v-model="itens.nome"
                        :rules="[() => validInput(itens.nome) || error]"
                        :error-messages="errors.collect('Nome')"
                        data-vv-name="Nome"
                        label="Nome"
                        placeholder="Informe seu nome completo."
                        required
                ></v-text-field>

                <v-text-field
                        v-validate="'required|min:14|max:15'"
                        v-model="itens.telefone"
                        :rules="[() => validInput(itens.telefone) || error]"
                        :error-messages="errors.collect('Telefone')"
                        data-vv-name="Telefone"
                        placeholder="(__) ____-____"
                        label="Telefone"
                        v-mask="['(##) ####-####', '(##) #####-####']"
                        required
                ></v-text-field>

                <v-text-field
                        v-validate="'required|cpf'"
                        v-model="itens.cpf"
                        :rules="[() => validInput(itens.cpf) || error]"
                        :error-messages="errors.collect('CPF')"
                        data-vv-name="CPF"
                        placeholder="___.___.___-__"
                        label="CPF"
                        v-mask="'###.###.###-##'"
                        required
                ></v-text-field>

                <v-dialog
                        ref="dialog"
                        v-model="modal"
                        :return-value.sync="itens.nascimento"
                        persistent
                        lazy
                        full-width
                        width="290px"
                >
                    <v-text-field
                            slot="activator"
                            v-validate="'required|dateBet'"
                            v-model="compDateFormated"
                            :rules="[() => validInput(compDateFormated) || error]"
                            :error-messages="errors.collect('Data-Nascimento')"
                            data-vv-name="Data-Nascimento"
                            label="Data de Nascimento"
                            prepend-icon="event"
                            readonly
                    ></v-text-field>
                    <v-date-picker v-model="itens.nascimento" scrollable locale="pt-br">
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="checkdate(false)">Cancelar</v-btn>
                        <v-btn flat color="primary" @click="checkdate(true)">OK</v-btn>
                    </v-date-picker>
                </v-dialog>

                <label class="stepper-label-parc">
                    Qual a sua ocupação?
                </label>

                <v-radio-group
                        v-model="itens.ocupacao.opcao"
                        :mandatory="false"
                        v-validate="'required'"
                        data-vv-name="ocupacao"
                        :error-messages="errors.collect('ocupacao')" >
                    <v-radio label="Aposentado" value="1"></v-radio>
                    <v-radio label="Pensionista" value="2"></v-radio>
                    <v-radio label="Forças Armadas" value="3"></v-radio>
                    <v-radio label="Funcionário Publico Federal" value="4"></v-radio>
                    <v-radio label="Funcionário Publico Estadual" value="5"></v-radio>

                    <v-radio label="Funcionário Publico Municipal" value="6"></v-radio>

                    <v-radio label="Funcionário Empresa Privada" value="7"></v-radio>
                    <v-radio label="Autônomo/Liberal" value="8"></v-radio>
                    <v-radio label="Não trabalha/ Desempregado" value="9"></v-radio>
                </v-radio-group>

                <div v-if="itens.ocupacao.opcao === '5'" >
                    <v-select
                            v-validate="'required'"
                            v-model="itens.ocupacao.estado"
                            :items="states"
                            :rules="[() => validInput(itens.ocupacao.estado) || error]"
                            :error-messages="errors.collect('Estado')"
                            data-vv-name="Estado"
                            label="Qual o estado?"
                            key="input-pessoal-estado"
                    ></v-select>
                </div>
                <div v-else-if="itens.ocupacao.opcao === '6'" >
                    <v-text-field
                            v-validate="'required|alpha_spaces|min:3'"
                            v-model="itens.ocupacao.cidade"
                            :rules="[() => validInput(itens.ocupacao.cidade) || error]"
                            :error-messages="errors.collect('Cidade')"
                            data-vv-name="Cidade"
                            label="Qual a cidade?"
                            key="input-pessoal-cidade"
                    ></v-text-field>
                </div>
                <div v-else-if="itens.ocupacao.opcao === '7'" >
                    <v-text-field
                            v-validate="'required|min:3'"
                            v-model="itens.ocupacao.empresa"
                            :rules="[() => validInput(itens.ocupacao.empresa) || error]"
                            :error-messages="errors.collect('empresa')"
                            data-vv-name="empresa"
                            label="Qual a empresa?"
                            key="input-pessoal-empresa"
                    ></v-text-field>
                </div>

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
    import myDictionary from '../../validations/dicionary'
    export default {
        name: "Page-1",
        data: () => ({
            modal: false,
            error:"Este campo é obrigatório!",
            itens:{
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
                ocupacao: {
                    opcao: null,
                    estado: "",
                    cidade: "",
                    empresa: "",
                }

            },
            states: ['Acre', 'Pernambuco'],
        }),
        mounted () {
            this.$validator.localize('en', myDictionary)
        },
        computed: {
            firstParcel: function () {
                return this.calcularJuros(0.008)

            },
            secondParcel: function () {
                return this.calcularJuros(0.05)
            },
            compDateFormated: function () {
                return this.formatDate(this.itens.nascimento)
            }
        },
        methods: {
            nextPage(page){
                this.$validator.validateAll().then((result) =>{
                    console.log('Validate Scope', result)
                    if (result) {
                        this.$store.commit('setStepperPessoal', this.itens)
                        this.$emit('alterTab', page)
                        // this.$emit('alterTab')
                        // this.e1 = page
                    }else{
                        // this.e1 = page
                    }
                })
            },
            calcularJuros(taxa){
                let qtd = parseInt(this.itens.parcela.split(" "))
                let valor = this.itens.initialValue
                let juros = (valor * taxa * qtd );

                return ((valor + juros) / qtd).toFixed(2).replace(".",",");
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
            checkdate(flag){
                if (flag) {
                    this.$refs.dialog.save(this.itens.nascimento)
                    this.$validator.validate('Data-Nascimento', this.compDateFormated).then((result) =>{
                        if (result) {
                            console.log('Data corrigida!')
                        }else{
                            console.log('Data não corrigida!')
                        }
                    })

                }else{
                    this.modal = false
                }

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