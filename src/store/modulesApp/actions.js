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
                    console.log('Action_Erro', error)
                    reject(error)
                }
            ).catch(
            (err) =>{
                console.log('catch Action_Erro', error)
                reject(err)
            })
    })
}
