const dictionary = {
    messages:{
        required: (field) => `O campo ${field} é obrigatório.`,
    },
    custom: {
        tratamento: {
            required: () => 'Informe o tratamento!',
        },
        motivo: {
            required: () => 'Informe o motivo do empréstimo!',
        },
        credito: {
            required: () => '',
        },
        creditoLast: {
            required: () => 'Informe o como pretende conseguir o crédito!',
        },
        limite: {
            required: () => 'Informe o limite atual do seu cartão!',
        },
        margemRadio: {
            required: () => 'Precisamos saber sua margem para que o empréstimo seja aprovado.',
        }
    }

}

export default dictionary