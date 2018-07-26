<template>
    <div>
        <v-card class="mb-5" height="auto" >
            <!--Para Func. Públicos Estaduais-->
            <div>
                <h2>Dados necessários para Funcionários Públicos Estaduais</h2>
                <p>
                    Selecione abaixo como vai nos informar sua margem de empréstimo livre: <br>
                    Para descobrir a margem ou ver contracheque acessar
                    <a href="www.peconsig.gov.br" target="_blank">www.peconsig.gov.br</a>
                    e digitar Matrícula e Senha
                </p>

                <v-radio-group
                        v-model="itens.estadual.margemRadio"
                        :mandatory="false"
                        v-validate="'required'"
                        data-vv-name="margemRadio"
                        :error-messages="errors.collect('margemRadio')" >
                    <v-radio label="Digite sua Margem Livre" value="1"></v-radio>
                    <v-radio label="Matrícula + Senha do Portal PE Consig " value="2"></v-radio>
                    <v-radio label="Foto do Contracheque " value="3"></v-radio>

                </v-radio-group>

                <div v-if="itens.estadual.margemRadio === '1'" >
                    <v-text-field
                            v-validate="'required'"
                            class="text-field-limite margin-top-none"
                            v-model="itens.estadual.margem"
                            :rules="[() => validInput(itens.estadual.margem) || error]"
                            :error-messages="errors.collect('margem')"
                            data-vv-name="margem"
                            v-money
                            required
                            key="input-margin"
                    ></v-text-field>
                    <p class="error-credito" v-if="showError">Informe o valor da margem.</p>
                </div>
                <div v-if="itens.estadual.margemRadio === '2'" >

                    <v-text-field
                            v-validate="'required'"
                            :error-messages="errors.collect('Matricula')"
                            data-vv-name="Matricula"
                            v-model="itens.estadual.matricula"
                            :rules="[() => validInput(itens.estadual.matricula) || error]"
                            label="Matrícula"
                            hint="Informe sua matrícula"
                            class="text-field-limite"
                            key="input-matricula"
                    ></v-text-field>

                    <v-text-field
                            v-validate="'required'"
                            :error-messages="errors.collect('Senha')"
                            data-vv-name="Senha"
                            v-model="itens.estadual.password"
                            :append-icon="passshow ? 'visibility_off' : 'visibility'"
                            :rules="[() => validInput(itens.estadual.password) || error]"
                            :type="passshow ? 'text' : 'password'"
                            label="Senha"
                            hint="Informe a senha do seu portal"
                            class="text-field-limite"
                            counter
                            @click:append="passshow = !passshow"
                            key="input-senha"
                    ></v-text-field>

                </div>
                <div v-if="itens.estadual.margemRadio === '3'" >

                    <img height="150"
                         :src="itens.estadual.file.imageUrl"
                         v-if="itens.estadual.file.imageUrl"/>
                    <v-text-field
                            v-validate="'required'"
                            :error-messages="errors.collect('Foto-Contracheque')"
                            data-vv-name="Foto-Contracheque"
                            v-model="itens.estadual.file.imageName"
                            :rules="[() => validInput(itens.estadual.file.imageName) || error]"
                            label="Selecione a imagem."
                            class="text-field-limite"
                            @click='pickFile'
                            prepend-icon='attach_file'
                            key="input-contracheque"
                    ></v-text-field>

                    <input type="file"
                           style="display: none;"
                           accept="image/*"
                           capture="camera"
                           ref="getImage"
                           @change="onFilePicked"/>

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
        name: "Page-3",
        data: () => ({
            error:"",
            showError: false,
            passshow: false,
            itens:{
                geral: {
                    pessoa: "",
                    nome: "",
                    cpf: "",
                    ocupacao: {
                        opcao: false,
                        estado: "",
                        cidade: "",
                        empresa: ""
                    },
                },
                estadual:{
                    margemRadio: null,
                    margem: "",
                    matricula: "",
                    password: "",
                    file: {
                        imageName: "",
                        imageUrl: "",
                        imageFile: "",
                    },
                },
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
                        this.$store.commit('setStepperAdicionais', this.itens)
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
            pickFile () {
                this.$refs.getImage.click ()
            },
            onFilePicked (e) {
                const files = e.target.files
                if(files[0] !== undefined) {
                    this.itens.estadual.file.imageName = files[0].name
                    if(this.itens.estadual.file.imageName.lastIndexOf('.') <= 0) {
                        return
                    }
                    const fr = new FileReader ()
                    fr.readAsDataURL(files[0])
                    fr.addEventListener('load', () => {
                        this.itens.estadual.file.imageUrl = fr.result
                        this.itens.estadual.file.imageFile = files[0] // this is an image file that can be sent to server...
                    })
                } else {
                    this.itens.estadual.file.imageName = ''
                    this.itens.estadual.file.imageFile = ''
                    this.itens.estadual.file.imageUrl = ''
                }
            },
            checkMoney(){
                if (this.itens.estadual.margem.includes("R$")){
                    console.log('Entrei aqui')
                    if (this.itens.estadual.margem === 'R$ 0,00' && this.itens.estadual.margemRadio === "1"){
                        this.showError = true
                        return false
                    }else{
                        this.showError = false
                        return true
                    }
                }else{
                    console.log('Entrei nesse')
                    return true
                }
            }
        }

    }
</script>

<style scoped>

</style>