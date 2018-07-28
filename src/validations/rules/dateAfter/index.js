import dateAfter from './dateAfter'
const validator = {
    getMessage (field, args) {
        return 'Informe uma data a partir de amanhã!'
    },
    validate (value, args) {
        return dateAfter(value)
    }
}
export default validator
