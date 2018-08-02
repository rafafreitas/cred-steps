export default {
    auth: false,
    userType: null,
    estados: [],
    cidades: [],
    stepperPessoal: {
        money: "",
        parcela: "",
        nome: "",
        telefone: "",
        cpf: "",
        email: "",
        nascimento: "",
        ocupacao: {
            opcao: "6",
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
