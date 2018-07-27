export const hasAuth = (state, flag) => {
    state.auth = flag
}

export const hasUserType = (state, type) => {
    state.userType = type
}

export const setStepperPessoal = (state, itens) => {
    state.stepperPessoal.money = itens.initialValue
    state.stepperPessoal.parcela = itens.parcela
    state.stepperPessoal.nome = itens.nome
    state.stepperPessoal.telefone = itens.telefone
    state.stepperPessoal.cpf = itens.cpf
    state.stepperPessoal.nascimento = itens.nascimento

    state.stepperPessoal.ocupacao.opcao = itens.ocupacao.opcao
    state.stepperPessoal.ocupacao.estado = itens.ocupacao.estado
    state.stepperPessoal.ocupacao.cidade = itens.ocupacao.cidade
    state.stepperPessoal.ocupacao.empresa = itens.ocupacao.empresa

}

export const setStepperMotivo = (state, itens) => {
    state.stepperMotivo.radios = itens.radios
    state.stepperMotivo.tratamento = itens.tratamento
    state.stepperMotivo.datepicker = itens.datepicker
    state.stepperMotivo.checkbox = itens.checkbox
    state.stepperMotivo.limite = itens.limite
}


export const setStepperAdicionais = (state, itens) => {
    state.stepperAdicionais = itens
}