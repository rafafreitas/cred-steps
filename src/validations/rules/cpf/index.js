import CpfValidate from './cpf'
const validator = {
  getMessage (field, args) {
    return 'CPF Inválido'
  },
  validate (value, args) {
    return CpfValidate(value)
  }
}
export default validator
