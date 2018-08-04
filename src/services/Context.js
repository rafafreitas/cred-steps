import httpClient from './../helpers/axios';

class ContextService {

  constructor() {
  }

  firstFlux(json) {
    return new Promise((resolve, reject) => {
      httpClient.post('/cliente', json)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
        .finally(() => {
          console.log('Finally-Bancos')
        })
    })
  }

}

export default new ContextService();
