<template>
    <div>
      <v-alert
        :value="$store.getters.alertsErros(1)"
        dismissible
        type="error"
      >
        Ocorreu um erro no envio das informações. Tente novamente!
      </v-alert>

      <v-alert
        :value="$store.getters.alertsErros(2)"
        dismissible
        type="warning"
      >
        Por favor, preencha os campos obrigatórios!
      </v-alert>

    </div>
</template>

<script>
    export default {
        name: "Alerts"
    }
</script>

<style scoped>

</style>
