const LoginRouter = require('./login-router')
const MissingParamError = require('../helpers/missing-param-error')

const makeSut = () => {
  class AuthUseCaseSpy {
    auth (email, password) {
      this.email = email
      this.password = password
    }
  }

  const authUseCaseSpy = new AuthUseCaseSpy()
  const sut = new LoginRouter(authUseCaseSpy)
  return {
    sut,
    authUseCaseSpy: authUseCaseSpy
  }
}

describe('Login Router', () => {
  test('should return HTTP code 500 if httpRequest isn\'t provided', () => {
    const { sut } = makeSut()
    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })

  test('should return HTTP code 500 if httpRequest.body isn\'t provided', () => {
    const { sut } = makeSut()
    const httpResponse = sut.route({})
    expect(httpResponse.statusCode).toBe(500)
  })

  test('should return HTTP code 400 if email isn\'t provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('should return HTTP code 400 if password isn\'t provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@any_provider.any_domain'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('should call AuthUseCase passing the right params', () => {
    const { sut, authUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@any_provider.any_domain',
        password: 'any_password'
      }
    }
    sut.route(httpRequest)
    expect(authUseCaseSpy.email).toBe(httpRequest.body.email)
    expect(authUseCaseSpy.password).toBe(httpRequest.body.password)
  })

  test('should return HTTP code 401 if credentials are invalid', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'invalid_email@invalid_provider.invalid_domain',
        password: 'invalid_password'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(401)
  })
})
