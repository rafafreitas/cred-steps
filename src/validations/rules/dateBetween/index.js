import dateBetween from './dateBetween'
const validator = {
    getMessage (field, args) {
        return 'Apenas maiores de idade podem retirar empréstimos!'
    },
    validate (value, args) {
        return dateBetween(value)
    }
}
export default validator
