export default {
    auth: false,
    userType: null,
    stepperPessoal: {
        money: "",
        parcela: "",
        nome: "",
        telefone: "",
        cpf: "",
        nascimento: "",
        ocupacao: {
            opcao: "",
            estado: "",
            cidade: "",
            empresa: ""
        }

    },
    stepperMotivo: {
        radios: "",
        tratamento: "",
        datepicker: "",
        checkbox: [],
        limite: ""
    },
    stepperAdicionais: {
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
            file: "",
        },

    },
}
