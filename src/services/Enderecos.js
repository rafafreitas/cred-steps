import httpClient from './../helpers/axios';

class EnderecosService {

    constructor() {
    }

    getStates() {
        return new Promise((resolve, reject) => {
            httpClient.get('/estados')
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
                .finally(() => {
                  console.log('Finally-Estados')
                })
        })
    }

    getCitys(uf) {
      return new Promise((resolve, reject) => {
        httpClient.get('/cidades/'+uf)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
          .finally(() => {
            console.log('Finally-Cidades')
          })
      })
    }
}

export default new EnderecosService();
