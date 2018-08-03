import httpClient from './../helpers/axios';

class BanksService {

  constructor() {
  }

  getBanks() {
    return new Promise((resolve, reject) => {
      httpClient.get('/bancos')
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

export default new BanksService();
