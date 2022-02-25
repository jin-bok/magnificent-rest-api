class EmailValidator {
  isValid (email) {
    return true
  }
}

describe('Email Validator', () => {
  test('should return true is validator library returns true', async () => {
    const sut = new EmailValidator()
    const isEmailValid = sut.isValid('valid_email@valid_provider.valid_domain')
    expect(isEmailValid).toBe(true)
  })
})
