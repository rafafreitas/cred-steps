<template>
    <div>
        <v-card class="mb-5" height="200px" >
            <h2>Tire foto ou faça o upload dos comprovantes!</h2>
            <h3>Os dados são necessários para que ocorra a aprovação.</h3>
            <br>

            <v-layout class="card-content-row-credito" row xs12 wrap>
                <v-flex xs12 sm12 @click='pickFile(1)'>
                    <img height="150"
                         :src="fotos.rg.imageUrl"
                         v-if="fotos.rg.imageUrl"/>
                    <v-text-field
                            v-validate="'required'"
                            :error-messages="errors.collect('Foto-Contracheque')"
                            data-vv-name="Foto-Contracheque"
                            v-model="fotos.rg.imageName"
                            :rules="[() => validInput(fotos.rg.imageName) || error]"
                            label="Foto do RG"
                            class="text-field-limite"
                            prepend-icon='attach_file'
                            key="input-rg"
                            readonly
                    ></v-text-field>

                    <input type="file"
                           style="display: none;"
                           accept="image/*"
                           ref="getImageRg"
                           key="input-file-rg"
                           @change="onFilePicked($event, 'rg')"/>
                </v-flex>


            </v-layout>

        </v-card>

        <v-btn color="primary">
            Enviar informações
        </v-btn>

        <v-btn flat>Cancelar</v-btn>
    </div>
</template>

<script>
    export default {
        name: "Page-4",
        data: () => ({
            error:"",
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
                        this.$refs.getImage.click()
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