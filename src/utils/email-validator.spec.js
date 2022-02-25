const validator = require('validator')

class EmailValidator {
  isValid (email) {
    return validator.isEmail(email)
  }
}

const makeSut = () => {
  return new EmailValidator()
}

describe('Email Validator', () => {
  test('should return true if validator library returns true', async () => {
    const sut = makeSut()
    const isEmailValid = sut.isValid('valid_email@valid_provider.valid_domain')
    expect(isEmailValid).toBe(true)
  })

  test('should return false if validator library returns false', async () => {
    validator.isEmailValid = false
    const sut = makeSut()
    const isEmailValid = sut.isValid('invalid_email@invalid_provider.invalid_domain')
    expect(isEmailValid).toBe(false)
  })

  test('should call validator library passing the right email', async () => {
    const sut = makeSut()
    sut.isValid('any_email@any_provider.any_domain')
    expect(validator.email).toBe('any_email@any_provider.any_domain')
  })
})
