export default {
    token: null,
    loadingG: false,
    auth: false,
    userType: null,
    errorMoney: false,
    alerts: {
      error: false,
      warning: false
    },
    isApp: false,
    estados: [],
    cidades: [],
    bancos: [],
    stepperPessoal: {
        router: "",
        money: "",
        parcela: "",
        parcelaValor: "",
        nome: "",
        telefone: "",
        cpf: "",
        email: "",
        nascimento: "",
        indicacao: "",
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
                rendaValor: null,
                banckBrasil: {
                    possui: null,
                    agencia: "",
                    conta: "",
                },
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
    stepperFinalize: {
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
}
