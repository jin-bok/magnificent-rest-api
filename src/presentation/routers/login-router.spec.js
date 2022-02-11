class LoginRouter {
  route (httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return {
        statusCode: 500
      }
    }
    const { email, password } = httpRequest.body
    if (!email || !password) {
      return {
        statusCode: 400
      }
    }
  }
}

describe('Login Router', () => {
  test('should return HTTP code 500 if httpRequest isn\'t provided', () => {
    const sut = new LoginRouter()
    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })

  test('should return HTTP code 500 if httpRequest.body isn\'t provided', () => {
    const sut = new LoginRouter()
    const httpResponse = sut.route({})
    expect(httpResponse.statusCode).toBe(500)
  })

  test('should return HTTP code 400 if email isn\'t provided', () => {
    const sut = new LoginRouter()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('should return HTTP code 400 if password isn\'t provided', () => {
    const sut = new LoginRouter()
    const httpRequest = {
      body: {
        email: 'any_email@any_provider.any_domain'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
