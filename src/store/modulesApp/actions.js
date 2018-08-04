import Enderecos from "./../../services/Enderecos"
import Context from "./../../services/Context"
import Banks from "./../../services/Banks"

export const getStates = (context) => {
    return new Promise((resolve, reject) => {
        Enderecos.getStates()
            .then(
                (result) => {
                    context.commit('setStates', result.data.result)
                    console.log('Estados Carregados')
                    resolve(result)
                },
                (error) => {
                    console.log('Estados_Erro', error)
                    reject(error)
                }
            ).catch(
            (err) =>{
                console.log('catch Action_Erro', error)
                reject(err)
            })
    })
}

export const getCitys = (context, data) => {
  return new Promise((resolve, reject) => {
    Enderecos.getCitys(data.uf)
      .then(
        (result) => {
          if (data.flag) {context.commit('setCitys', result.data.result)}
          console.log('Cidades Carregadas')
          resolve(result)
        },
        (error) => {
          console.log('Cidades_Erro', error)
          reject(error)
        }
      ).catch(
      (err) =>{
        console.log('Catch Action_Erro', error)
        reject(err)
      })
  })
}

export const getBanks = (context) => {
  return new Promise((resolve, reject) => {
    Banks.getBanks()
      .then(
        (result) => {
          context.commit('setBanks', result.data.result)
          console.log('Bancos Carregados')
          resolve(result)
        },
        (error) => {
          console.log('Bancos_Erro', error)
          reject(error)
        }
      ).catch(
      (err) =>{
        console.log('Catch Bank', error)
        reject(err)
      })
  })
}

export const initContext = (context) => {
  return new Promise((resolve, reject) => {
    Context.firstFlux(context.getters.getStepperPessoal)
      .then(
        (result) => {
          context.commit('hasToken', result.data.token)
          console.log('First-Step =>', result.data.result)
          resolve(result)
        },
        (error) => {
          console.log('First-Step => Erro', error)
          reject(error)
        }
      ).catch(
      (err) =>{
        console.log('Catch First-Step', error)
        reject(err)
      })
  })
}

export const reasonContext = (context) => {
  return new Promise((resolve, reject) => {
    Context.secondFlux(context.getters.getStepperMotivo)
      .then(
        (result) => {
          context.commit('hasToken', result.data.token)
          console.log('Second-Step =>', result.data.result)
          resolve(result)
        },
        (error) => {
          console.log('Second-Step => Erro', error)
          reject(error)
        }
      ).catch(
      (err) =>{
        console.log('Catch Second-Step', error)
        reject(err)
      })
  })
}

export const additionalContext = (context) => {
  return new Promise((resolve, reject) => {
    Context.thirdFlux(context.getters.getStepperAdicionais)
      .then(
        (result) => {
          context.commit('hasToken', result.data.token)
          console.log('Third-Step =>', result.data.result)
          resolve(result)
        },
        (error) => {
          console.log('Third-Step => Erro', error)
          reject(error)
        }
      ).catch(
      (err) =>{
        console.log('Catch Third-Step', error)
        reject(err)
      })
  })
}
