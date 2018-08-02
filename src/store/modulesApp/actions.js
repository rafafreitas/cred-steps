import Enderecos from "./../../services/Enderecos"

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

export const getCitys = (context, uf) => {
  return new Promise((resolve, reject) => {
    Enderecos.getCitys(uf)
      .then(
        (result) => {
          context.commit('setCitys', result.data.result)
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
