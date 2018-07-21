<template>
    <div class="fixed-center text-center">
        <p>
            <img
                    src="~assets/logo1.png"
                    style="width:30vw;max-width:150px;"
            >
        </p>
        <p class="text-faded">Desculpe, nada encontrado...<strong>(404)</strong></p>
        <v-btn
                color="info"
                @click="$router.push('/home')">Voltar
        </v-btn>

    </div>
</template>

<script>
    export default {
        name: "404"
    }
</script>

<style scoped>

</style>