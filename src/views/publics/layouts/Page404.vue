<template>
    <div class="container-contato">
        <v-layout class="card-content-404" row xs12 wrap>
            <v-flex xs12 sm12>
                <div class="logo">
                    <img class="logo-404" src="../../../assets/clinical.png">
                </div>
            </v-flex>
            <v-flex xs12 sm12>
                <div class="text">
                    <p class="text-faded">Desculpe, esse endereço não existe...<strong>ERROR (404)</strong></p>
                </div>
            </v-flex>
            <v-flex xs12 sm12>
                <div class="btn">
                    <v-btn color="info" @click="$router.push('/')">Voltar</v-btn>
                </div>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    export default {
        name: "Page404"
    }
</script>

<style scoped lang="scss">
    .logo-404{
        max-width: 450px;
    }
    p{
     font-size: 14pt;
    }
    .card-content-404{
        margin-top: 30px;
        .logo{
            max-width: 450px;
            margin-left: auto;
            margin-right: auto;
        }
        .text{
            max-width: 420px;
            margin-left: auto;
            margin-right: auto;
        }
        .btn{
            max-width: 103px;
            margin-left: auto;
            margin-right: auto;
        }
    }

</style>