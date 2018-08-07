const dictionary = {
    messages:{
        alpha_spaces: (field) => `O campo ${field} pode conter apenas caracteres alfabéticos e espaços.`,
        date_format: (field, [format]) => `O campo ${field} deve estar no formato ${format}.`,
        digits: (field, [length]) => `O campo ${field} deve ser numérico e ter exatamente ${length} dígitos.`,
        email: (field) => `O campo ${field} deve ser um email válido.`,
        max: (field) => `O campo ${field} tem um limite de caracteres.`,
        min: (field) => `O campo ${field} está incompleto.`,
        numeric: (field) => `O campo ${field} deve conter apenas números`,
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
