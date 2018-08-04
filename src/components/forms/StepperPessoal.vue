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
                                tick-size="2"
                                thumb-label
                                min="500"
                                max="50000"
                                step="500"
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
                        {{firstParcel}} e {{secondParcel}}
                    </label>
                </p>

                <v-text-field
                        v-validate="'required|alpha_spaces|min:6'"
                        v-model="itens.nome"
                        :rules="[() => validInput(itens.nome) || error]"
                        :error-messages="errors.collect('Nome')"
                        data-vv-name="Nome"
                        label="Nome"
                        placeholder="Informe seu nome completo"
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
                        type="tel"
                        v-mask="['(##) ####-####', '(##) #####-####']"
                        required
                ></v-text-field>

                <v-text-field
                        v-validate="'email'"
                        v-model="itens.email"
                        :error-messages="errors.collect('E-mail')"
                        data-vv-name="E-mail"
                        label="E-mail"
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
                        type="tel"
                        required
                ></v-text-field>

                <v-text-field
                        v-validate="'required|dateBet|date_format:DD/MM/YYYY'"
                        v-model="itens.nascimento"
                        :rules="[() => validInput(itens.nascimento) || error]"
                        :error-messages="errors.collect('Data-Nascimento')"
                        data-vv-name="Data-Nascimento"
                        label="Data de Nascimento"
                        placeholder="__/__/____"
                        v-mask="'##/##/####'"
                        @change="checkdate(true)"
                        prepend-icon="event"
                        type="tel"
                ></v-text-field>

                <label class="stepper-label-parc">
                    Qual a sua ocupação?
                </label>

                <v-radio-group
                        v-model="itens.ocupacao.opcao"
                        :mandatory="false"
                        v-validate="'required'"
                        data-vv-name="ocupacao"
                        @change="changeOption()"
                        :error-messages="errors.collect('ocupacao')" >
                    <v-radio label="Aposentado" value="1"></v-radio>
                    <v-radio label="Pensionista" value="2"></v-radio>
                    <v-radio label="Forças armadas" value="3"></v-radio>
                    <v-radio label="Funcionário público federal" value="4"></v-radio>
                    <v-radio label="Funcionário público estadual" value="5"></v-radio>

                    <v-radio label="Funcionário público municipal" value="6"></v-radio>

                    <v-radio label="Funcionário empresa privada" value="7"></v-radio>
                    <v-radio label="Autônomo/Liberal" value="8"></v-radio>
                    <v-radio label="Não trabalha/Desempregado" value="9"></v-radio>
                </v-radio-group>

                <div v-if="itens.ocupacao.opcao === '5' || itens.ocupacao.opcao === '6'" >
                    <v-select
                        v-validate="'required'"
                        v-model="itens.ocupacao.estado"
                        :items="$store.getters.getEstados"
                        item-text="Nome"
                        item-value="Uf"
                        no-data-text="Carregando lista de estados..."
                        :rules="[() => validInput(itens.ocupacao.estado) || error]"
                        :error-messages="errors.collect('Estado')"
                        data-vv-name="Estado"
                        label="Qual o estado?"
                        key="input-pessoal-estado-2"
                        class="text-field-limite-more"
                        @change="callApi($event)"
                    ></v-select>
                </div>
                <div v-if="itens.ocupacao.opcao === '6'" >
                    <v-select
                        v-validate="'required'"
                        v-model="itens.ocupacao.cidade"
                        :items="$store.getters.getCidades"
                        item-text="Nome"
                        item-value="Id"
                        no-data-text="Escolha o estado"
                        :rules="[() => validInput(itens.ocupacao.estado) || error]"
                        :error-messages="errors.collect('Cidade')"
                        data-vv-name="Cidade"
                        label="Qual o cidade?"
                        class="text-field-limite-more"
                        key="input-pessoal-cidade"
                        :loading="loading"
                    ></v-select>

                </div>
                <div v-if="itens.ocupacao.opcao === '7'" >
                    <v-text-field
                            v-validate="'required|min:3'"
                            v-model="itens.ocupacao.empresa"
                            :rules="[() => validInput(itens.ocupacao.empresa) || error]"
                            :error-messages="errors.collect('empresa')"
                            data-vv-name="empresa"
                            label="Qual a empresa?"
                            class="text-field-limite-more"
                            key="input-pessoal-empresa"
                    ></v-text-field>
                </div>

            </div>
        </v-card>

        <v-btn color="primary" @click="nextPage(2)">
            Enviar
        </v-btn>

        <p class="stepper-text-footer">
            * Os valores apresentados acima são apenas fins comparativos.
            Para calcular a sua taxa real clique em "Continuar" e finalize
            seu pedido sem compromisso.
        </p>
    </div>
</template>

<script>
    import myDictionary from '../../validations/dicionary'
    export default {
        name: "Page-1",
        data: () => ({
            loading: false,
            error:"Este campo é obrigatório!",
            itens:{
                initialValue: 5000,
                parcelas: [
                    '1 Parcela',
                    '3 Parcelas',
                    '6 Parcelas',
                    '9 Parcelas',
                    '12 Parcelas',
                    '18 Parcelas',
                    '24 Parcelas',
                    '36 Parcelas',
                    '48 Parcelas',
                    '60 Parcelas',
                    '72 Parcelas',
                    '96 Parcelas'
                ],
                parcela: "12 Parcelas",
                nome: "",
                telefone: "",
                cpf: "",
                email: "",
                nascimento: "",
                ocupacao: {
                    opcao: null,
                    estado: "",
                    cidade: "",
                    empresa: "",
                }

            },
        }),
        mounted () {
            this.$validator.localize('en', myDictionary)
        },
        computed: {
            firstParcel: function () {
                return new Intl.NumberFormat('pt-BR',
                    { style: 'currency', currency: 'BRL' }).format(parseFloat(this.calcularJuros(0.008).replace(",",".")));
            },
            secondParcel: function () {
                return new Intl.NumberFormat('pt-BR',
                    { style: 'currency', currency: 'BRL' }).format(parseFloat(this.calcularJuros(0.05).replace(",",".")));
            },
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
            validInput(input){
                if (input){
                    return true
                } else{
                    return false
                }
            },
            checkdate(flag){
                if (flag) {
                    this.$validator.validate('Data-Nascimento', this.itens.nascimento).then((result) =>{
                        if (result) {
                            console.log('Data corrigida!')
                        }else{
                            console.log('Data não corrigida!')
                        }
                    })

                }else{

                }

            },
            callApi(uf){
              if (this.itens.ocupacao.opcao === '6'){
                this.loading = true
                this.$store.dispatch('getCitys',{uf: uf, flag: true})
                  .then(result => {
                    this.loading = false
                  })
                  .catch(err => {
                    this.loading = false
                  })
              }
            },
            changeOption(){
              this.$store.commit('setCitys', [])
              this.itens.ocupacao.estado = ""
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
