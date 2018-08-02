<template>
    <div>
        <v-card class="mb-5" height="auto" >

            <!--Para Func. Públicos Estaduais-->
            <div class="container-data-public" v-if="this.$store.getters.hasSecondCategory">
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
                    <v-radio label="Valor da margem livre" value="1"></v-radio>
                    <v-radio label="Matrícula + senha do portal PE Consig " value="2"></v-radio>
                    <v-radio label="Foto do contracheque " value="3"></v-radio>

                </v-radio-group>

                <div v-if="itens.estadual.margemRadio === '1'" >
                    <v-text-field
                            v-validate="'required'"
                            class="text-field-limite margin-top-none"
                            v-model="itens.estadual.margem"
                            :rules="[() => validInput(itens.estadual.margem) || error]"
                            :error-messages="errors.collect('margem')"
                            data-vv-name="margem"
                            type="tel"
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
                <div v-if="itens.estadual.margemRadio === '3'" class="text-field-limite" @click='pickFile(true)'>

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
                            prepend-icon='attach_file'
                            key="input-contracheque"
                            readonly
                    ></v-text-field>

                    <input type="file"
                           style="display: none;"
                           accept="image/*"
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

                <div v-if="itens.municipal.margemRadio === '1'" >
                    <v-text-field
                            v-validate="'required'"
                            class="text-field-limite margin-top-none"
                            v-model="itens.municipal.margem"
                            :rules="[() => validInput(itens.municipal.margem) || error]"
                            :error-messages="errors.collect('margem')"
                            data-vv-name="margem"
                            v-money
                            required
                            type="tel"
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
                <div v-if="itens.municipal.margemRadio === '3'" class="text-field-limite" @click='pickFile(false)'>

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
                            prepend-icon='attach_file'
                            key="input-contracheque-municipal"
                            readonly
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
                        <label>Possui restrição SPC/Serasa?</label>
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
                        <label>Emprego carteira assinada?</label>
                        <v-radio-group
                                v-model="itens.geral.financeiras.emprego"
                                :mandatory="false"
                                v-validate="'required'"
                                data-vv-name="Emprego Carteira Assinada"
                                :error-messages="errors.collect('Emprego Carteira Assinada')">
                            <v-radio label="Sim, mais de 6 meses" value="1"></v-radio>
                            <v-radio label="Sim, menos de 6 meses" value="2"></v-radio>
                            <v-radio label="Não" value="3"></v-radio>
                        </v-radio-group>
                    </v-flex>

                    <v-flex xs12 sm6>
                        <label>Renda comprovada?</label>
                        <v-radio-group
                                v-model="itens.geral.financeiras.rendaComprovada"
                                :mandatory="false"
                                v-validate="'required'"
                                data-vv-name="Renda Comprovada"
                                :error-messages="errors.collect('Renda Comprovada')">
                            <v-radio label="Sim, contracheque" value="1"></v-radio>
                            <v-radio label="Sim, imposto de renda" value="2"></v-radio>
                            <v-radio label="Sim, extrato  bancário" value="3"></v-radio>
                            <v-radio label="Não" value="4"></v-radio>
                        </v-radio-group>
                    </v-flex>

                    <v-flex xs12 sm6>
                        <v-layout class="card-content-row-credito" row xs12 wrap>
                            <v-flex xs12 sm6>
                                <label>Possui cheque?</label>
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
                                    <label>Cheques devolvidos nos últimos 6 meses?</label>
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
                        <label>Conta em banco?</label>
                        <v-radio-group
                                v-model="itens.geral.financeiras.banck.possui"
                                :mandatory="false"
                                v-validate="'required'"
                                data-vv-name="Conta em Banco"
                                :error-messages="errors.collect('Conta em Banco')"
                                key="input-add-cheque">
                            <v-radio label="Sim, conta corrente" value="1"></v-radio>
                            <v-radio label="Sim, conta poupança" value="2"></v-radio>
                            <v-radio label="Não" value="3"></v-radio>
                        </v-radio-group>
                    </v-flex>

                    <v-flex xs12 sm6  v-if="hasBanck">
                        <label>Tempo de conta</label>
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
                                label="Qual o banco?"
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
            <!--Dados de Pessoas proximas-->
            <div>
                <hr>
                <br>
                <b>Pessoas Proximas</b><br><br>
                <p>
                    Poderemos melhorar as condições do seu crédito com uma maior quantidade de dados de pessoas próximas.
                    Preencha abaixo o máximo de dados possíveis para que agilizemos a aprovação do seu crédito
                </p>
            </div>

            <div class="v-for-parentesco" v-for="(item, index) in itens.geral.parentescos"
                :key="'parentesco-container-'+index">
                <v-layout class="card-content-row-credito" row xs12 wrap>
                    <v-flex xs12 sm12>
                        <p>{{index+1}}º Indicação</p>
                    </v-flex>

                    <v-flex xs12 sm6>
                        <label>Grau de Parentesco</label>
                        <v-radio-group
                                v-model="itens.geral.parentescos[index].grau"
                                :mandatory="false"
                                v-validate="'required'"
                                data-vv-as="Parentesco"
                                :data-vv-name="'parentesco-radio-'+index"
                                :error-messages="errors.collect('parentesco-radio-'+index)" >
                            <v-radio label="Pai" value="1"></v-radio>
                            <v-radio label="Mãe" value="2"></v-radio>
                            <v-radio label="Conjuge" value="3"></v-radio>
                            <v-radio label="Outra pessoa próxima" value="4"></v-radio>
                        </v-radio-group>

                    </v-flex>

                    <v-flex xs12 sm6 v-if="itens.geral.parentescos[index].grau !== ''">
                        <label>Dados</label>

                        <v-text-field v-if="itens.geral.parentescos[index].grau === '4'"
                                      v-validate="'required|alpha_spaces'"
                                      v-model="itens.geral.parentescos[index].proximidade"
                                      :rules="[() => validInput(itens.geral.parentescos[index].proximidade) || error]"
                                      data-vv-as="Proximidade"
                                      :data-vv-name="'parentesco-proximidade-'+index"
                                      :error-messages="errors.collect('parentesco-proximidade-'+index)"
                                      label="Relação de Proximidade"
                                      placeholder="O que ela é para você?"
                                      class="text-field-limite"
                                      required
                        ></v-text-field>

                        <v-text-field
                                v-validate="'required|alpha_spaces|min:6'"
                                v-model="itens.geral.parentescos[index].nome"
                                :rules="[() => validInput(itens.geral.parentescos[index].nome) || error]"
                                data-vv-as="Nome"
                                :data-vv-name="'parentesco-nome-'+index"
                                :error-messages="errors.collect('parentesco-nome-'+index)"
                                label="Nome"
                                placeholder="Informe o nome completo"
                                class="v-flex-conainer-med"
                                required
                        ></v-text-field>

                        <v-text-field
                                v-validate="'required|min:14|max:15'"
                                v-model="itens.geral.parentescos[index].telefone"
                                :rules="[() => validInput(itens.geral.parentescos[index].telefone) || error]"
                                data-vv-as="Telefone"
                                :data-vv-name="'parentesco-telefone-'+index"
                                :error-messages="errors.collect('parentesco-telefone-'+index)"
                                placeholder="(__) ____-____"
                                label="Telefone"
                                v-mask="'(##)#####-####'"
                                class="text-field-limite"
                                required
                        ></v-text-field>

                        <v-text-field
                                v-validate="'required|cpf'"
                                v-model="itens.geral.parentescos[index].cpf"
                                :rules="[() => validInput(itens.geral.parentescos[index].cpf) || error]"
                                data-vv-as="CPF"
                                :data-vv-name="'parentesco-cpf-'+index"
                                :error-messages="errors.collect('parentesco-cpf-'+index)"
                                placeholder="___.___.___-__"
                                label="CPF"
                                v-mask="'###.###.###-##'"
                                class="text-field-limite"
                                required
                        ></v-text-field>

                        <v-text-field
                                v-validate="'required|dateBet|date_format:DD/MM/YYYY'"
                                v-model="itens.geral.parentescos[index].nascimento"
                                :rules="[() => validInput(itens.geral.parentescos[index].nascimento) || error]"
                                data-vv-as="Data Nascimento"
                                :data-vv-name="'parentesco-data-'+index"
                                :error-messages="errors.collect('parentesco-data-'+index)"
                                label="Data de Nascimento"
                                placeholder="__/__/____"
                                class="text-field-limite"
                                v-mask="'##/##/####'"
                                @change="checkdate(true, index)"
                                type="tel"
                        ></v-text-field>

                    </v-flex>

                    <v-flex xs12 sm12>
                        <label>Ocupação</label>

                        <v-radio-group
                                v-model="itens.geral.parentescos[index].ocupacao.opcao"
                                :mandatory="false"
                                v-validate="'required'"
                                data-vv-as="Ocupacao"
                                :data-vv-name="'parentesco-ocupacao-'+index"
                                @change="changeOption(index)"
                                :error-messages="errors.collect('parentesco-ocupacao-'+index)">
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

                        <div v-if="itens.geral.parentescos[index].ocupacao.opcao === '5' ||
                                   itens.geral.parentescos[index].ocupacao.opcao === '6'" >
                            <v-select
                                    v-validate="'required'"
                                    v-model="itens.geral.parentescos[index].ocupacao.estado"
                                    :items="$store.getters.getEstados"
                                    item-text="Nome"
                                    item-value="Uf"
                                    no-data-text="Carregando lista de estados..."
                                    :rules="[() => validInput(itens.geral.parentescos[index].ocupacao.estado) || error]"
                                    data-vv-as="Estado"
                                    :data-vv-name="'parentesco-estado-'+index"
                                    :error-messages="errors.collect('parentesco-estado-'+index)"
                                    label="Qual o estado?"
                                    class="text-field-limite-more"
                                    key="input-add-ocupacao-estado"
                                    @change="callApi($event, index)"
                            ></v-select>
                        </div>

                        <div v-if="itens.geral.parentescos[index].ocupacao.opcao === '6'" >
                            <v-select
                                    v-validate="'required'"
                                    v-model="itens.geral.parentescos[index].ocupacao.cidade"
                                    :items="citys[index].cidades"
                                    item-text="Nome"
                                    item-value="Id"
                                    no-data-text="Escolha o estado"
                                    :rules="[() => validInput(itens.geral.parentescos[index].ocupacao.cidade) || error]"
                                    data-vv-as="Cidade"
                                    :data-vv-name="'parentesco-cidade-'+index"
                                    :error-messages="errors.collect('parentesco-cidade-'+index)"
                                    label="Qual o cidade?"
                                    class="text-field-limite-more"
                                    key="input-add-ocupacao-cidade"
                                    :loading="loading[index].item"
                            ></v-select>
                        </div>

                        <div v-if="itens.geral.parentescos[index].ocupacao.opcao === '7'" >
                            <v-text-field
                                    v-validate="'required'"
                                    v-model="itens.geral.parentescos[index].ocupacao.empresa"
                                    :rules="[() => validInput(itens.geral.parentescos[index].ocupacao.empresa) || error]"
                                    data-vv-as="Empresa"
                                    :data-vv-name="'parentesco-empresa-'+index"
                                    :error-messages="errors.collect('parentesco-empresa-'+index)"
                                    label="Qual a empresa?"
                                    key="input-add-ocupacao-empresa"
                            ></v-text-field>
                        </div>
                    </v-flex>

                    <v-flex xs12 sm12>
                        <v-btn v-if="index > 0" class="btn-del-parentesco" color="error" @click="cloneParentesco(index)">
                            Remover esta referência
                        </v-btn>
                    </v-flex>

                </v-layout>
                <hr>
            </div>

            <v-btn class="btn-add-parentesco" color="secondary" @click="cloneParentesco(null)">
                <v-icon>add</v-icon>
                Informe outra referência
            </v-btn>

        </v-card>

        <v-btn color="primary" @click="nextPage(4)">
            Enviar informações
        </v-btn>

        <v-btn flat @click="$emit('backE1', 2)">Voltar</v-btn>
    </div>
</template>

<script>
    import myDictionary from '../../validations/dicionary'
    export default {
        name: "Page-3",
        data: () => ({
            loading: [{
                item: false
            }],
            error:"",
            clone: 2,
            showError: false,
            passshow: false,
            banks: ['Caixa', 'Banco do Brasil', 'Santander'],
            itens:{
                geral: {
                    parentescos: [{
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
                    }],
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
            states: [],
            citys: [{
              cidades: []
            }]
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
            pickFile (flag) {
                if (flag){
                    this.$refs.getImage.click ()
                }else{
                    this.$refs.getImageMunicipal.click ()
                }
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
            },
            checkdate(flag, index){
                if (flag) {
                    this.$validator.validate('parentesco-data-'+index, this.itens.geral.parentescos[index].nascimento).then((result) =>{
                        if (result) {
                            console.log('Data corrigida!')
                        }else{
                            console.log('Data não corrigida!')
                        }
                    })

                }else{

                }

            },
            cloneParentesco(index){
                if (!index){
                    this.citys.push({
                      cidades: []
                    })
                    this.loading.push({
                      item: false
                    })
                    this.clone++
                    this.itens.geral.parentescos.push({
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
                    })
                }else{
                    this.itens.geral.parentescos.splice(index, 1)
                    this.citys.splice(index, 1)
                    this.loading.splice(index, 1)
                }
            },
            callApi(uf, index){
              if (this.itens.geral.parentescos[index].ocupacao.opcao === '6'){
                this.loading[index].item = true
                this.$store.dispatch('getCitys',{uf: uf, flag: false})
                  .then(result => {
                    this.loading[index].item = false
                    this.citys[index].cidades = result.data.result
                  })
                  .catch(err => {
                    this.loading[index].item = false
                  })
              }
            },
            changeOption(index){
              this.citys[index].cidades = []
              this.itens.geral.parentescos[index].ocupacao.estado = ""
              this.itens.geral.parentescos[index].ocupacao.cidade = ""
            }
        }

    }
</script>

<style scoped lang="scss">
    .v-for-parentesco{
        border-right: solid .01rem #02a099;
        border-left: solid 1px #02a099;
        padding: 20px 10px 0px 10px;
    }
    .btn-add-parentesco{
        margin-top: 30px;
    }
    .btn-del-parentesco{
        margin-bottom: 20px;
    }
</style>
