<template>
    <div class="container-contato">
        <v-layout class="card-content-404" row xs12 wrap>
            <v-flex xs12 sm12>
                <div class="logo">
                    <img class="logo-404" src="../../../assets/logo1.png">
                </div>
            </v-flex>
            <v-flex xs12 sm12>
                <div class="text">
                    <p class="text-faded">
                        Sua solicitação foi enviada!<br>
                        <strong>Agradecemos seu interesse!</strong>

                    </p>
                </div>
            </v-flex>
            <v-flex xs12 sm12>
                <div class="btn">
                    <v-btn color="info" @click="$router.push('/')">Fazer uma nova solicitação!</v-btn>
                </div>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    export default {
        name: "Finish"
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
            max-width: 240px;
            margin-left: auto;
            margin-right: auto;
            text-align: center;
        }
        .btn{
            max-width: 259px;
            margin-left: auto;
            margin-right: auto;
        }
    }
</style>