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
                    <h1 class="text-faded">Aprovação rápida de crédito!</h1>
                </div>
            </v-flex>
            <v-flex xs12 sm12>
                <div class="btn">
                    <v-btn color="primary" @click="$router.push('/formulario')">Fazer solicitação!</v-btn>
                </div>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style scoped lang="scss">
    .logo-404{
        max-width: 650px;
    }
    p{
        font-size: 14pt;
    }
    .card-content-404{
        margin-top: 30px;
        .logo{
            max-width: 650px;
            margin-left: auto;
            margin-right: auto;
        }
        .text{
            max-width: 650px;
            text-align: center;
            margin-left: auto;
            margin-right: auto;
        }
        .btn{
            margin-top: 20px;
            max-width: 187px;
            margin-left: auto;
            margin-right: auto;
        }
    }

    @media screen and (max-width: 670px) {
      .logo-404{
        max-width: 350px;
      }
      .card-content-404{
        margin-top: 50px;
        .logo{
          max-width: 350px;
        }
        .text{
          max-width: 350px;
          text-align: center;
          h1{
            font-size: 12pt;
          }
        }
        .btn{
          margin-top: 20px;
          max-width: 187px;
        }
      }
    }
</style>
