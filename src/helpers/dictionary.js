const dictionary = {
    messages:{
        required: (field) => `O campo ${field} é obrigatório.`,
    },
    custom: {
        ocupacao: {
            required: () => 'Por favor, informe sua ocupação atual!',
        },
        nascimento:{
            required: () => 'Por favor, informe a data do seu nascimento!',
        },
        empresa: {
            required: () => 'Por fafor, informe a empresa que você trabalha!',
        },
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