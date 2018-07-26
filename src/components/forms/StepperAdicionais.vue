<template>
    <div>
        <v-card class="mb-5" height="auto" >
            <!--Para Func. Públicos Estaduais-->
            <div>
                <h2>Funcionário Público Estadual</h2>
                <p>
                    Selecione abaixo a forma de nos informar sua margem de empréstimo livre: <br>
                    Para descobrir a margem ou ver contracheque acessar
                    <a href="www.peconsig.gov.br" target="_blank">www.peconsig.gov.br</a>
                    e digitar Matrícula e Senha
                </p>

                <v-radio-group
                        v-model="itens.margemRadio"
                        :mandatory="false"
                        v-validate="'required'"
                        data-vv-name="margemRadio"
                        :error-messages="errors.collect('margemRadio')" >
                    <v-radio label="Digitar Margem Livre" value="1"></v-radio>
                    <v-radio label="Matrícula + Senha do Portal PE Consig " value="2"></v-radio>
                    <v-radio label="Foto do Contracheque " value="3"></v-radio>
                </v-radio-group>

                <div v-if="itens.margemRadio == parseInt(1)" >
                    <label>
                        Qual a Margem?
                    </label>
                    <v-text-field
                            v-validate="'required'"
                            class="text-field-limite"
                            v-model="itens.margem"
                            :rules="[() => validInput(itens.margem) || error]"
                            :error-messages="errors.collect('margem')"
                            data-vv-name="margem"
                            v-money
                            required
                    ></v-text-field>
                    <p class="error-credito" v-if="showError">Informe o valor da margem.</p>
                </div>

            </div>

        </v-card>

        <v-btn color="primary" @click="nextPage(4)">
            Enviar informações
        </v-btn>

        <v-btn flat>Cancelar</v-btn>
    </div>
</template>

<script>
    import myDictionary from '../../helpers/dictionary'
    export default {
        name: "StepperAdicionais",
        data: () => ({
            error:"",
            showError: "",
            modal: false,
            itens:{
                margemRadio: null,
                margem: null,
            },
        }),
        mounted () {
            this.$validator.localize('en', myDictionary)
        },
        methods: {
            nextPage(page){
                this.$validator.validateAll().then((result) =>{
                    console.log('Validate Adicionais', result)
                    if (result && this.checkMoney()) {
                        this.$store.commit('setStepperMotivo', this.itens)
                        this.$emit('alterTab', page)
                    }else{
                        //
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
            checkMoney(){
                if (this.itens.margem.includes("R$")){
                    if (this.itens.margem === 'R$ 0,00'){
                        this.showError = true
                        return false
                    }else{
                        this.showError = false
                        return true
                    }
                }
            }
        }

    }
</script>

<style scoped>

</style>