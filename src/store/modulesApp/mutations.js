export const hasToken = (state, token) => {
    state.token = token
}

export const hasLoadingG = (state, flag) => {
  state.loadingG = flag
}

export const hasUserType = (state, type) => {
    state.userType = type
}

export const setStates = (state, estados) => {
    state.estados = estados
}

export const setCitys = (state, cidades) => {
  state.cidades = cidades
}

export const setBanks = (state, bancos) => {
  state.bancos = bancos
}

export const setToken = (state, token) => {
  state.token = token
}

export const setStepperPessoal = (state, itens) => {
    state.stepperPessoal.money = itens.initialValue
    state.stepperPessoal.parcela = itens.parcela
    state.stepperPessoal.nome = itens.nome
    state.stepperPessoal.telefone = itens.telefone
    state.stepperPessoal.cpf = itens.cpf
    state.stepperPessoal.email = itens.email
    state.stepperPessoal.nascimento = itens.nascimento
    state.stepperPessoal.indicacao = itens.indicacao

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

export const setStepperFinalize = (state, fotos) => {
    state.stepperFinalize = fotos
}
