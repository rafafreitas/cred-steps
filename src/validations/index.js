import VeeValidator, { Validator } from 'vee-validate'
import CpfValidator from './rules/cpf'
import DateBetween from './rules/dateBetween'
import DateAfter from './rules/dateAfter'

Validator.extend('cpf', CpfValidator)
Validator.extend('dateBet', DateBetween)
Validator.extend('dateAfter', DateAfter)

export default VeeValidator
