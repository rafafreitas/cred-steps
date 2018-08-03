import Enderecos from "./../../services/Enderecos"
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
