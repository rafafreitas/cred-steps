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
        }
    }

}

export default dictionary