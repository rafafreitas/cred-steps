<template>
    <div>
        <v-card class="mb-5" height="auto" >
            <!--Para Func. Públicos Estaduais-->
            <div class="container-data-public">
                <h2>Dados necessários para Funcionários Públicos Estaduais</h2>
                <br>
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
                           key="input-file-municipal"
                           @change="onFilePicked"/>

                </div>
                <hr>
                <br>
            </div>

            <!--Para Func Público Municipal  -->
            <div v-if="this.$store.getters.hasThirdCategory">
                <h2>Dados necessários para Funcionários Públicos Municipais</h2>
                <br>
                <p>
                    Selecione abaixo como vai nos informar sua margem de empréstimo livre: <br>
                    Para descobrir a margem ou ver o contracheque acesse: <br>
                    <span v-if="this.$store.getters.hasCityMunicipal === 1">
                        <a href="http://www.recife.pe.gov.br/pser/" target="_blank">O Portal do Servidor de Recife</a>
                        e digite a Matrícula e Senha.<br>
                    </span>
                    <span v-if="this.$store.getters.hasCityMunicipal === 2">
                        <a href="https://www.faciltecnologia.com.br/consigfacil/jaboatao/index_servidor.php" target="_blank">
                            O Portal do Servidor de Jaboatão dos Guararapes</a>
                            e digite a Matrícula e Senha.
                    </span>

                </p>
                <v-radio-group
                        v-model="itens.municipal.margemRadio"
                        :mandatory="false"
                        v-validate="'required'"
                        data-vv-name="margemRadio"
                        :error-messages="errors.collect('margemRadio')" >
                    <v-radio label="Digite sua Margem Livre" value="1"></v-radio>
                    <v-radio label="Matrícula + Senha do Portal do Servidor " value="2"></v-radio>
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
                <div v-if="itens.municipal.margemRadio === '2'" >

                    <v-text-field
                            v-validate="'required'"
                            :error-messages="errors.collect('Matricula')"
                            data-vv-name="Matricula"
                            v-model="itens.municipal.matricula"
                            :rules="[() => validInput(itens.municipal.matricula) || error]"
                            label="Matrícula"
                            hint="Informe sua matrícula"
                            class="text-field-limite"
                            key="input-matricula-municipal"
                    ></v-text-field>

                    <v-text-field
                            v-validate="'required'"
                            :error-messages="errors.collect('Senha')"
                            data-vv-name="Senha"
                            v-model="itens.municipal.password"
                            :append-icon="passshow ? 'visibility_off' : 'visibility'"
                            :rules="[() => validInput(itens.municipal.password) || error]"
                            :type="passshow ? 'text' : 'password'"
                            label="Senha"
                            hint="Informe a senha do seu portal"
                            class="text-field-limite"
                            counter
                            @click:append="passshow = !passshow"
                            key="input-senha-municipal"
                    ></v-text-field>

                </div>
                <div v-if="itens.municipal.margemRadio === '3'" >

                    <img height="150"
                         :src="itens.municipal.file.imageUrl"
                         v-if="itens.municipal.file.imageUrl"/>
                    <v-text-field
                            v-validate="'required'"
                            :error-messages="errors.collect('Foto-Contracheque')"
                            data-vv-name="Foto-Contracheque"
                            v-model="itens.municipal.file.imageName"
                            :rules="[() => validInput(itens.municipal.file.imageName) || error]"
                            label="Selecione a imagem."
                            class="text-field-limite"
                            @click='pickFile(false)'
                            prepend-icon='attach_file'
                            key="input-contracheque-municipal"
                    ></v-text-field>
                    <input type="file"
                           style="display: none;"
                           accept="image/*"
                           capture="camera"
                           ref="getImageMunicipal"
                           key="input-file-municipal"
                           @change="onFilePickedMunicipal"/>
                </div>
                <hr>
                <br>
            </div>

            <!--Para todas as categorias -->
            <!--Questões Financeiras-->
            <div>

                <v-layout class="card-content-row-credito" row xs12 wrap>
                    <v-flex xs12 sm12>
                        <label>
                            <b>Questões financeiras:</b>
                        </label>
                    </v-flex>

                    <v-flex xs12 sm6>
                        <label>Possui Restrição SPC/Serasa?</label>
                        <v-radio-group
                                v-model="itens.geral.financeiras.spc"
                                :mandatory="false"
                                v-validate="'required'"
                                data-vv-name="SPC-Serasa"
                                :error-messages="errors.collect('SPC-Serasa')" >
                            <v-radio label="Sim" value="true"></v-radio>
                            <v-radio label="Não" value="false"></v-radio>
                        </v-radio-group>
                    </v-flex>

                    <v-flex xs12 sm6>
                        <label>Emprego Carteira Assinada?</label>
                        <v-radio-group
                                v-model="itens.geral.financeiras.emprego"
                                :mandatory="false"
                                v-validate="'required'"
                                data-vv-name="Emprego Carteira Assinada"
                                :error-messages="errors.collect('Emprego Carteira Assinada')">
                            <v-radio label="Sim, mais de 6 meses." value="1"></v-radio>
                            <v-radio label="Sim, menos de 6 meses." value="2"></v-radio>
                            <v-radio label="Não" value="3"></v-radio>
                        </v-radio-group>
                    </v-flex>

                    <v-flex xs12 sm6>
                        <label>Renda Comprovada?</label>
                        <v-radio-group
                                v-model="itens.geral.financeiras.rendaComprovada"
                                :mandatory="false"
                                v-validate="'required'"
                                data-vv-name="Renda Comprovada"
                                :error-messages="errors.collect('Renda Comprovada')">
                            <v-radio label="Sim, contracheque." value="1"></v-radio>
                            <v-radio label="Sim, Imposto de Renda." value="2"></v-radio>
                            <v-radio label="Sim, Extrato  Bancário" value="3"></v-radio>
                            <v-radio label="Não" value="4"></v-radio>
                        </v-radio-group>
                    </v-flex>

                    <v-flex xs12 sm6>
                        <v-layout class="card-content-row-credito" row xs12 wrap>
                            <v-flex xs12 sm6>
                                <label>Possui Cheque?</label>
                                <v-radio-group
                                        v-model="itens.geral.financeiras.cheque"
                                        :mandatory="false"
                                        v-validate="'required'"
                                        data-vv-name="Possui Cheque"
                                        :error-messages="errors.collect('Possui Cheque')" >
                                    <v-radio label="Sim" value="true"></v-radio>
                                    <v-radio label="Não" value="false"></v-radio>
                                </v-radio-group>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <div v-if="itens.geral.financeiras.cheque === 'true'" >
                                    <label>Cheques Devolvidos nos Últimos 6 meses?</label>
                                    <v-radio-group
                                            v-model="itens.geral.financeiras.chequeDev"
                                            :mandatory="false"
                                            v-validate="'required'"
                                            data-vv-name="Cheques Devolvidos"
                                            :error-messages="errors.collect('Cheques Devolvidos')"
                                            key="input-add-cheque">
                                        <v-radio label="Sim" value="true"></v-radio>
                                        <v-radio label="Não" value="false"></v-radio>
                                    </v-radio-group>
                                </div>
                            </v-flex>

                        </v-layout>
                    </v-flex>

                    <v-flex xs12 sm6>
                        <label>Conta em Banco?</label>
                        <v-radio-group
                                v-model="itens.geral.financeiras.banck.possui"
                                :mandatory="false"
                                v-validate="'required'"
                                data-vv-name="Conta em Banco"
                                :error-messages="errors.collect('Conta em Banco')"
                                key="input-add-cheque">
                            <v-radio label="Sim, Conta Corrente." value="1"></v-radio>
                            <v-radio label="Sim, Conta Poupança." value="2"></v-radio>
                            <v-radio label="Não" value="3"></v-radio>
                        </v-radio-group>
                    </v-flex>

                    <v-flex xs12 sm6  v-if="hasBanck">
                        <label>Tempo de Conta</label>
                        <v-radio-group
                                v-model="itens.geral.financeiras.banck.tempoConta"
                                :mandatory="false"
                                v-validate="'required'"
                                data-vv-name="Tempo de Conta"
                                :error-messages="errors.collect('Tempo de Conta')"
                                key="input-add-banco-tempo">
                            <v-radio label="Mais de 1 ano" value="true"></v-radio>
                            <v-radio label="Menos de 1 ano" value="false"></v-radio>
                        </v-radio-group>
                    </v-flex>

                    <v-flex xs12 sm4 class="v-flex-conainer-low" v-if="hasBanck">
                        <v-select
                                v-validate="'required'"
                                v-model="itens.geral.financeiras.banck.banco"
                                :items="banks"
                                :rules="[() => validInput(itens.geral.financeiras.banck.banco) || error]"
                                :error-messages="errors.collect('Banco')"
                                data-vv-name="Banco"
                                label="Qual o Banco?"
                                key="input-add-banco-banck"
                        ></v-select>
                    </v-flex>

                    <v-flex xs12 sm4 class="v-flex-conainer-low"  v-if="hasBanck">
                        <v-text-field
                                v-validate="'required'"
                                v-model="itens.geral.financeiras.banck.agencia"
                                :rules="[() => validInput(itens.geral.financeiras.banck.agencia) || error]"
                                :error-messages="errors.collect('Agencia')"
                                data-vv-name="Agencia"
                                label="Agência"
                                key="input-add-banco-agencia"
                        ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm4 class="v-flex-conainer-low"  v-if="hasBanck">
                        <v-text-field
                                v-validate="'required'"
                                v-model="itens.geral.financeiras.banck.conta"
                                :rules="[() => validInput(itens.geral.financeiras.banck.conta) || error]"
                                :error-messages="errors.collect('Conta')"
                                data-vv-name="Conta"
                                label="Conta"
                                key="input-add-banco-Conta"
                        ></v-text-field>
                    </v-flex>

                </v-layout>
            </div>

            <!--Para todas as categorias -->
            <!--Dados de Pessoas proximas-->
            <div>
                <hr>
                <br>
                <v-layout class="card-content-row-credito" row xs12 wrap>
                    <v-flex xs12 sm12>
                        <b>Pessoas Proximas</b><br><br>
                        <p>
                            Poderemos melhorar as condições do seu crédito com uma maior quantidade de dados de pessoas próximas.
                            preencha abaixo o máximo de dados possíveis para que agilizemos a aprovação do seu crédito
                        </p>
                    </v-flex>

                    <v-flex xs12 sm6>
                        <label>Dados</label>
                        <v-text-field
                                v-validate="'required'"
                                v-model="itens.geral.parentesco.nome"
                                :rules="[() => validInput(itens.geral.parentesco.nome) || error]"
                                :error-messages="errors.collect('Nome')"
                                data-vv-name="Nome"
                                label="Nome"
                                class="v-flex-conainer-med"
                                key="input-add-parentesco-nome"
                                required
                        ></v-text-field>

                        <v-text-field
                                v-validate="'required'"
                                v-model="itens.geral.parentesco.telefone"
                                :rules="[() => validInput(itens.geral.parentesco.telefone) || error]"
                                :error-messages="errors.collect('Telefone')"
                                data-vv-name="Telefone"
                                placeholder="(__) ____-____"
                                label="Telefone"
                                mask="(##) #####-####"
                                class="text-field-limite"
                                key="input-add-parentesco-telefone"
                                required
                        ></v-text-field>

                        <v-text-field
                                v-validate="'required'"
                                v-model="itens.geral.parentesco.cpf"
                                :rules="[() => validInput(itens.geral.parentesco.cpf) || error]"
                                :error-messages="errors.collect('CPF')"
                                data-vv-name="CPF"
                                placeholder="___.___.___-__"
                                label="CPF"
                                mask="###.###.###-##"
                                class="text-field-limite"
                                key="input-add-parentesco-cpf"
                                required
                        ></v-text-field>

                    </v-flex>

                    <v-flex xs12 sm6>
                        <label>Parentesco</label>
                        <v-radio-group
                                v-model="itens.geral.parentesco.grau"
                                :mandatory="false"
                                v-validate="'required'"
                                data-vv-name="Parentesco"
                                :error-messages="errors.collect('Parentesco')" >
                            <v-radio label="Pai" value="1"></v-radio>
                            <v-radio label="Mãe" value="2"></v-radio>
                            <v-radio label="Conjuge" value="3"></v-radio>
                            <v-radio label="Outra pessoa próxima" value="4"></v-radio>
                        </v-radio-group>

                        <v-text-field v-if="itens.geral.parentesco.grau === '4'"
                                v-validate="'required'"
                                v-model="itens.geral.parentesco.proximidade"
                                :rules="[() => validInput(itens.geral.parentesco.proximidade) || error]"
                                :error-messages="errors.collect('Proximidade')"
                                data-vv-name="Proximidade"
                                label="Relação de Proximidade"
                                key="input-add-parentesco-grau"
                                required
                        ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm6>
                        <label>Ocupação</label>

                        <v-radio-group
                                v-model="itens.geral.parentesco.ocupacao.opcao"
                                :mandatory="false"
                                v-validate="'required'"
                                data-vv-name="Ocupacao"
                                :error-messages="errors.collect('Ocupacao')" >
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

                        <div v-if="itens.geral.parentesco.ocupacao.opcao === '5'" >
                            <v-select
                                    v-validate="'required'"
                                    v-model="itens.geral.parentesco.ocupacao.estado"
                                    :items="states"
                                    :rules="[() => validInput(itens.geral.parentesco.ocupacao.estado) || error]"
                                    :error-messages="errors.collect('Estado')"
                                    data-vv-name="Estado"
                                    label="Qual o estado?"
                                    key="input-add-ocupacao-estado"
                            ></v-select>
                        </div>
                        <div v-else-if="itens.geral.parentesco.ocupacao.opcao === '6'" >
                            <v-text-field
                                    v-validate="'required'"
                                    v-model="itens.geral.parentesco.ocupacao.cidade"
                                    :rules="[() => validInput(itens.geral.parentesco.ocupacao.cidade) || error]"
                                    :error-messages="errors.collect('Cidade')"
                                    data-vv-name="Cidade"
                                    label="Qual a cidade?"
                                    key="input-add-ocupacao-cidade"
                            ></v-text-field>
                        </div>
                        <div v-else-if="itens.geral.parentesco.ocupacao.opcao === '7'" >
                            <v-text-field
                                    v-validate="'required'"
                                    v-model="itens.geral.parentesco.ocupacao.empresa"
                                    :rules="[() => validInput(itens.geral.parentesco.ocupacao.empresa) || error]"
                                    :error-messages="errors.collect('empresa')"
                                    data-vv-name="empresa"
                                    label="Qual a empresa?"
                                    key="input-add-ocupacao-empresa"
                            ></v-text-field>
                        </div>
                    </v-flex>


                </v-layout>
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
            banks: ['Caixa', 'Banco do Brasil', 'Santander'],
            itens:{
                geral: {
                    parentesco: {
                        grau: "",
                        proximidade: "",
                        nome: "",
                        cpf: "",
                        telefone: "",
                        nascimento: "",
                        ocupacao: {
                            opcao: null,
                            estado: "",
                            cidade: "",
                            empresa: ""
                        },
                    },
                    financeiras:{
                        spc: null,
                        cheque: null,
                        chequeDev: null,
                        emprego: null,
                        rendaComprovada: null,
                        banck: {
                            possui: null,
                            banco: '',
                            tempoConta: null,
                            agencia: "",
                            conta: "",
                        }
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
                    }
                },
                municipal: {
                    margemRadio: null,
                    margem: "",
                    matricula: "",
                    password: "",
                    file: {
                        imageName: "",
                        imageUrl: "",
                        imageFile: "",
                    }
                }
            },
            states: ['Acre', 'Pernambuco'],
        }),
        mounted () {
            this.$validator.localize('en', myDictionary)
        },
        computed:{
            hasBanck :function () {
                return (this.itens.geral.financeiras.banck.possui === '1' || this.itens.geral.financeiras.banck.possui === '2')
            }
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
            onFilePickedMunicipal (e) {
                const files = e.target.files
                if(files[0] !== undefined) {
                    this.itens.municipal.file.imageName = files[0].name
                    if(this.itens.municipal.file.imageName.lastIndexOf('.') <= 0) {
                        return
                    }
                    const fr = new FileReader ()
                    fr.readAsDataURL(files[0])
                    fr.addEventListener('load', () => {
                        this.itens.municipal.file.imageUrl = fr.result
                        this.itens.municipal.file.imageFile = files[0] // this is an image file that can be sent to server...
                    })
                } else {
                    this.itens.municipal.file.imageName = ''
                    this.itens.municipal.file.imageFile = ''
                    this.itens.municipal.file.imageUrl = ''
                }
            },
            checkMoney(){
                if (this.itens.estadual.margem.includes("R$") || this.itens.municipal.margem.includes("R$")){
                    console.log('Entrei aqui')
                    if ((this.itens.estadual.margem === 'R$ 0,00' && this.itens.estadual.margemRadio === "1") ||
                        this.itens.municipal.margem === 'R$ 0,00' && this.itens.municipal.margemRadio === "1"){
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