const validator = require('validator')

class EmailValidator {
  isValid (email) {
    return validator.isEmail(email)
  }
}

describe('Email Validator', () => {
  test('should return true if validator library returns true', async () => {
    const sut = new EmailValidator()
    const isEmailValid = sut.isValid('valid_email@valid_provider.valid_domain')
    expect(isEmailValid).toBe(true)
  })

  test('should return false if validator library returns false', async () => {
    validator.isEmailValid = false
    const sut = new EmailValidator()
    const isEmailValid = sut.isValid('invalid_email@invalid_provider.invalid_domain')
    expect(isEmailValid).toBe(false)
  })
})
