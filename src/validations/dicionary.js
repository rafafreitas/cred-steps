const dictionary = {
    messages:{
        required: (field) => `O campo ${field} é obrigatório.`,
        min: (field) => `O campo ${field} está incompleto.`,
        max: (field) => `O campo ${field} tem um limite de caracteres.`,
        alpha_spaces: (field) => `O campo ${field} pode conter apenas caracteres alfabéticos e espaços.`,
        date_format: (field, [format]) => `O campo ${field} deve estar no formato ${format}.`,

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