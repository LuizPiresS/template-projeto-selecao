import { isValidEmail } from '@brazilian-utils/brazilian-utils'

import { IValidator } from '../../core/common/IValidator'

export class ValidatorAdapter implements IValidator {
  isUsername (value: string): boolean {
    if (!value || !value.trim()) {
      return false
    }

    if (!/^[a-zA-Z]+$/.test(value)) {
      return false
    }

    return true
  }

  isEmail (email: string): boolean {
    return isValidEmail(email)
  }

  isPassword (password: string): boolean {
    if (!password) {
      return false
    }

    if (password.length < 8) {
      return false
    }

    return true
  }

  isDate (date: string): boolean {
    return !Number.isNaN(new Date(date).valueOf())
  }
}
