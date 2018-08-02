export const isAuth = (state) => {
    return state.auth
}

export const getUserType = (state) => {
    return state.userType
}

export const getEstados = (state) => {
    return state.estados
}

export const getStepperPessoal = (state) => {
    return state.stepperPessoal
}

export const hasFuncMuniciapal = (state) => {
    // Funcionário Publico Municipal
    if (state.stepperPessoal.ocupacao.opcao === '6'){
        return true
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
    // Funcionário Empresa Privada
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

export const hasSecondCategory = (state) => {
    // Funcionário Publico Estadual
    if (state.stepperPessoal.ocupacao.opcao === '5'){
        return true
    }else{
        return false
    }
}

export const hasThirdCategory = (state) => {
    // Funcionário Publico Municipal
    if (state.stepperPessoal.ocupacao.opcao === '6'){
        if (state.stepperPessoal.ocupacao.cidade === 'Recife' || state.stepperPessoal.ocupacao.cidade === 'Jaboatão'){
            return true
        }else{
            return false
        }
    }else{
        return false
    }
}

export const hasCityMunicipal = (state) => {
    // Funcionário Publico Municipal
    if (state.stepperPessoal.ocupacao.cidade === 'Recife'){
        return 1
    }else if (state.stepperPessoal.ocupacao.cidade === 'Jaboatão'){
        return 2
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