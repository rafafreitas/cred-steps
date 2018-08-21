import store from '../../../store'

function checkMoney(value){
  let newValue = value.replace('R$ ', '')
  newValue = newValue.replace('.', '')
  newValue = parseFloat(newValue.replace(',', '.'))

  if (newValue === 0 && !store.getters.showErrorMoney){
    return true
  }else if (newValue < 0.01){
    store.commit('hasErrorMoney', true)
    return false
  } else{
    return true
  }
}

export default checkMoney
