export const isToken = (state) => {
    return state.token
}

export const isLoadingG = (state) => {
  return state.loadingG
}

export const alertsErros = (state) => (id) =>{
  switch (id) {
    case 1:
      return state.alerts.pessoal
      break
    case 2:
      return state.alerts.motivo
      break
    case 3:
      return state.alerts.adicionais
      break
    case 4:
      return state.alerts.finalize
      break
  }
}

export const showErrorMoney = (state) =>  {
  return state.errorMoney
}

export const getUserType = (state) => {
    return state.userType
}

export const getEstados = (state) => {
    return state.estados
}

export const getCidades = (state) => {
  return state.cidades
}

export const getBanks = (state) => {
  return state.bancos
}

export const getStepperPessoal = (state) => {
    return state.stepperPessoal
}

export const getStepperMotivo = (state) => {
  return state.stepperMotivo
}

export const getStepperAdicionais = (state) => {
  return state.stepperAdicionais
}

export const getStepperFinal = (state) => {
  return state.stepperFinalize
}

export const hasFuncEstadual = (state) => {
  // Funcionário Publico Estadual
  if (state.stepperPessoal.ocupacao.opcao === '5'){
    return true
  }else{
    return false
  }
}

export const hasFuncMuniciapal = (state) => {
  // Funcionário Publico Municipal
  if (state.stepperPessoal.ocupacao.opcao === '6'){
    return true
  }else{
    return false
  }
}

export const hasCityMunicipal = (state) => {
  // Funcionário Publico Municipal da cidade de Recife ou Jaboatão.
  if (state.stepperPessoal.ocupacao.cidade === '1597'){
    return 1
  }else if (state.stepperPessoal.ocupacao.cidade === '1553'){
    return 2
  }else{
    return false
  }
}

export const hasFuncPrivate = (state) => {
    // Funcionário Empresa Privada
    if (state.stepperPessoal.ocupacao.opcao === '7'){
        return true
    }else{
        return false
    }
}

export const hasDesempregado = (state) => {
    // Funcionário Desempregado
    if (state.stepperPessoal.ocupacao.opcao === '9'){
        return true
    }else{
        return false
    }
}

export const hasFirstCategory = (state) => {
    // Aposentado - Pensionista - Forças Armadas - Funcionário Publico Federal
    if (state.stepperPessoal.ocupacao.opcao === '1' || state.stepperPessoal.ocupacao.opcao === '2' ||
        state.stepperPessoal.ocupacao.opcao === '3' || state.stepperPessoal.ocupacao.opcao === '4' ){
        return true
    }else{
        return false
    }
}

export const hasThirdCategory = (state) => {
    // Funcionário Publico Municipal
    if (state.stepperPessoal.ocupacao.opcao === '6'){
        if (state.stepperPessoal.ocupacao.cidade === '1597' || state.stepperPessoal.ocupacao.cidade === '1553'){
            return true
        }else{
            return false
        }
    }else{
        return false
    }
}

export const hasFourthCategory = (state) => {
  // Funcionário Empresa Privada - Autônomo/Liberal - Não trabalha/ Desempregado
  if (state.stepperPessoal.ocupacao.opcao === '7' || state.stepperPessoal.ocupacao.opcao === '8' ||
    state.stepperPessoal.ocupacao.opcao === '9' ){
    return true
  }else{
    return false
  }
}




