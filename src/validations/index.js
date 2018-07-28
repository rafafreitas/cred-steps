import VeeValidator, { Validator } from 'vee-validate'
import CpfValidator from './rules/cpf'
import DateBetween from './rules/dateBetween'

Validator.extend('cpf', CpfValidator)
Validator.extend('dateBet', DateBetween)

export default VeeValidator
