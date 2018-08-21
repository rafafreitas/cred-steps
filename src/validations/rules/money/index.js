import MoneyValidate from './money'
const validator = {
  getMessage (field, args) {
    return 'Informe o valor da parcela!'
  },
  validate (value, args) {
    return MoneyValidate(value)
  }
}
export default validator
