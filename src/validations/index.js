import VeeValidator, { Validator } from 'vee-validate'
import CpfValidator from './rules/cpf'

Validator.extend('cpf', CpfValidator)

export default VeeValidator
