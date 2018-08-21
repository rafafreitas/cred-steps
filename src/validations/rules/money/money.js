function checkMoney(value){
  let newValue = value.replace('R$ ', '')
  newValue = newValue.replace('.', '')
  newValue = parseFloat(newValue.replace(',', '.'))

  if (newValue < 0.01){
    // console.log(newValue)
    return false
  } else{
    return true
  }
}

export default checkMoney
