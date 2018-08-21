import VeeValidator, { Validator } from 'vee-validate'
import CpfValidator from './rules/cpf'
import DateBetween from './rules/dateBetween'
import DateAfter from './rules/dateAfter'
import money from './rules/money'

Validator.extend('cpf', CpfValidator)
Validator.extend('dateBet', DateBetween)
Validator.extend('dateAfter', DateAfter)
Validator.extend('money', money)

export default VeeValidator
