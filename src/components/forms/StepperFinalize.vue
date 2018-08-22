<template>
    <div>
        <v-card class="mb-5" height="auto" >
            <h2>Tire foto ou faça o upload dos comprovantes!</h2>
            <h3>Os dados são necessários para que ocorra a aprovação.</h3>
            <br>

            <v-layout class="card-content-row-credito" row xs12 wrap>
                <v-flex xs12 sm12>
                    <div class="text-field-limite" @click='pickFile(1)'>
                        <img height="150"
                             :src="fotos.rg.imageUrl"
                             v-if="fotos.rg.imageUrl"/>
                        <v-text-field
                                v-validate="'required'"
                                :error-messages="errors.collect('Foto-Rg')"
                                data-vv-name="Foto-Rg"
                                v-model="fotos.rg.imageName"
                                :rules="[() => validInput(fotos.rg.imageName) || error]"
                                label="Foto do RG"
                                class="text-field-limite"
                                prepend-icon='account_box'
                                key="input-rg"
                                readonly
                        ></v-text-field>

                        <input type="file"
                               style="display: none;"
                               accept="image/*"
                               ref="getImageRg"
                               key="input-file-rg"
                               @change="onFilePicked($event, 'rg')"/>
                    </div>
                </v-flex>

                <v-flex xs12 sm12>
                    <div class="text-field-limite" @click='pickFile(2)'>
                        <img height="150"
                             :src="fotos.cpf.imageUrl"
                             v-if="fotos.cpf.imageUrl"/>
                        <v-text-field
                                v-validate="'required'"
                                :error-messages="errors.collect('Foto-Cpf')"
                                data-vv-name="Foto-Cpf"
                                v-model="fotos.cpf.imageName"
                                :rules="[() => validInput(fotos.cpf.imageName) || error]"
                                label="Foto do CPF"
                                class="text-field-limite"
                                prepend-icon='account_balance_wallet'
                                key="input-cpf"
                                readonly
                        ></v-text-field>

                        <input type="file"
                               style="display: none;"
                               accept="image/*"
                               ref="getImageCpf"
                               key="input-file-cpf"
                               @change="onFilePicked($event, 'cpf')"/>
                    </div>
                </v-flex>

                <v-flex xs12 sm12>
                    <div class="text-field-limite" @click='pickFile(3)'>
                        <img height="150"
                             :src="fotos.comprovante.imageUrl"
                             v-if="fotos.comprovante.imageUrl"/>
                        <v-text-field
                                v-validate="'required'"
                                :error-messages="errors.collect('Foto-Comprovante')"
                                data-vv-name="Foto-Comprovante"
                                v-model="fotos.comprovante.imageName"
                                :rules="[() => validInput(fotos.comprovante.imageName) || error]"
                                label="Comp. de residência"
                                class="text-field-limite"
                                prepend-icon='attach_file'
                                key="input-comprovante"
                                readonly
                        ></v-text-field>

                        <input type="file"
                               style="display: none;"
                               accept="image/*"
                               ref="getImageComp"
                               key="input-file-comprovante"
                               @change="onFilePicked($event, 'comprovante')"/>
                    </div>
                </v-flex>

                <v-flex xs12 sm12
                        v-if="this.$store.getters.hasFuncEstadual ||
                              this.$store.getters.hasFuncMuniciapal ||
                              this.$store.getters.hasFuncPrivate">
                    <div class="text-field-limite" @click='pickFile(4)'>
                        <img height="150"
                             :src="fotos.contraCheque.imageUrl"
                             v-if="fotos.contraCheque.imageUrl"/>
                        <v-text-field
                                v-validate="'required'"
                                :error-messages="errors.collect('Foto-Contracheque')"
                                data-vv-name="Foto-Contracheque"
                                v-model="fotos.contraCheque.imageName"
                                :rules="[() => validInput(fotos.contraCheque.imageName) || error]"
                                label="Último contracheque"
                                class="text-field-limite"
                                prepend-icon='assignment'
                                key="input-contra"
                                readonly
                        ></v-text-field>

                        <input type="file"
                               style="display: none;"
                               accept="image/*"
                               ref="getImageCont"
                               key="input-file-contra"
                               @change="onFilePicked($event, 'contraCheque')"/>
                    </div>
                </v-flex>

                <v-flex xs12 sm12
                        v-if="this.$store.getters.hasFuncPrivate">
                    <div class="text-field-limite" @click='pickFile(5)'>
                        <img height="150"
                             :src="fotos.ctps.imageUrl"
                             v-if="fotos.ctps.imageUrl"/>
                        <v-text-field
                                v-validate="'required'"
                                :error-messages="errors.collect('Foto-Carteira')"
                                data-vv-name="Foto-Carteira"
                                v-model="fotos.ctps.imageName"
                                :rules="[() => validInput(fotos.ctps.imageName) || error]"
                                label="Carteira de trabalho"
                                class="text-field-limite"
                                prepend-icon='chrome_reader_mode'
                                key="input-ctps"
                                readonly
                        ></v-text-field>

                        <input type="file"
                               style="display: none;"
                               accept="image/*"
                               ref="getImageCtps"
                               key="input-file-ctps"
                               @change="onFilePicked($event, 'ctps')"/>
                    </div>
            </v-flex>

                <v-flex xs12 sm12
                        v-if="this.$store.getters.hasDesempregado">
                    <div class="text-field-limite" @click='pickFile(6)'>
                        <img height="150"
                             :src="fotos.imposto.imageUrl"
                             v-if="fotos.imposto.imageUrl"/>
                        <v-text-field
                                v-validate="'required'"
                                :error-messages="errors.collect('Foto-Extrato')"
                                data-vv-name="Foto-Extrato"
                                v-model="fotos.imposto.imageName"
                                :rules="[() => validInput(fotos.imposto.imageName) || error]"
                                label="Imposto de renda ou extrato bancário"
                                class="text-field-limite"
                                prepend-icon='attach_file'
                                key="input-imposto"
                                readonly
                        ></v-text-field>

                        <input type="file"
                               style="display: none;"
                               accept="image/*"
                               ref="getImageImposto"
                               key="input-file-imposto"
                               @change="onFilePicked($event, 'imposto')"/>
                    </div>
                </v-flex>

                <v-flex xs12 sm12>
                    <br>
                    <p>Obrigado pelas informações, faremos contato em breve!</p>
                </v-flex>

            </v-layout>

        </v-card>
        <v-alert
          v-model="$store.getters.alertsErros(4)"
          dismissible
          type="error"
        >
          Ocorreu um erro no envio das informações. Tente novamente!
        </v-alert>

        <v-btn color="primary" @click="nextPage()" :loading="$store.getters.isLoadingG">
              Enviar
        </v-btn>

    </div>
</template>

<script>
    export default {
        name: "Page-4",
        data: () => ({
            error:"",
            alert: false,
            fotos: {
                rg : {
                    imageName: "",
                    imageUrl: "",
                    imageFile: "",
                    },
                cpf: {
                    imageName: "",
                    imageUrl: "",
                    imageFile: "",
                    },
                comprovante: {
                    imageName: "",
                    imageUrl: "",
                    imageFile: "",
                    },
                contraCheque: {
                    imageName: "",
                    imageUrl: "",
                    imageFile: "",
                },
                ctps: {
                    imageName: "",
                    imageUrl: "",
                    imageFile: "",
                },
                imposto: {
                    imageName: "",
                    imageUrl: "",
                    imageFile: "",
                }
            }
        }),
        methods: {
            nextPage(){
                this.$validator.validateAll().then((result) =>{
                    console.log('Validate Finalize', result)
                    if (result) {
                        this.$store.commit('setStepperFinalize', this.fotos)
                        this.$emit('finish')
                    }else{
                        this.$store.commit('hasAlertError', {flag: true, type: 2})
                        setTimeout(()=>{this.$store.commit('hasAlertError', {flag: false, type: 2})}, 3000);
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
            pickFile (id) {
                switch (id){
                    case 1:
                        this.$refs.getImageRg.click()
                        break;
                    case 2:
                        this.$refs.getImageCpf.click()
                        break;
                    case 3:
                        this.$refs.getImageComp.click()
                        break;
                    case 4:
                        this.$refs.getImageCont.click()
                        break;
                    case 5:
                        this.$refs.getImageCtps.click()
                        break;
                    case 6:
                        this.$refs.getImageImposto.click()
                        break;
                }
            },
            onFilePicked (e, elem) {
                console.log('Foto',e)
                console.log('Elem', elem)
                const files = e.target.files
                if(files[0] !== undefined) {
                    this.fotos[elem].imageName = files[0].name
                    if(this.fotos[elem].imageName.lastIndexOf('.') <= 0) {
                        return
                    }
                    const fr = new FileReader ()
                    fr.readAsDataURL(files[0])
                    fr.addEventListener('load', () => {
                        this.fotos[elem].imageUrl = fr.result
                        this.fotos[elem].imageFile = files[0] // this is an image file that can be sent to server...
                    })
                } else {
                    this.fotos[elem].imageName = ''
                    this.itens[elem].imageFile = ''
                    this.fotos[elem].imageUrl = ''
                }
            },
        }

    }
</script>

<style scoped>

</style>
