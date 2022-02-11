const LoginRouter = require('./login-router')
const MissingParamError = require('../helpers/missing-param-error')

const makeSut = () => {
  return new LoginRouter()
}

describe('Login Router', () => {
  test('should return HTTP code 500 if httpRequest isn\'t provided', () => {
    const sut = makeSut()
    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })

  test('should return HTTP code 500 if httpRequest.body isn\'t provided', () => {
    const sut = makeSut()
    const httpResponse = sut.route({})
    expect(httpResponse.statusCode).toBe(500)
  })

  test('should return HTTP code 400 if email isn\'t provided', () => {
    const sut = makeSut()
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
    const sut = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@any_provider.any_domain'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })
})
