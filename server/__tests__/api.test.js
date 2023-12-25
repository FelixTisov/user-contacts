const supertest = require('supertest')
const { app, stop } = require('../index')
const request = supertest(app)

// Тест метода авторизации пользователя
describe('POST /user/login', () => {
  afterAll(() => {
    stop()
  })

  describe('получены пароль и логин', () => {
    test('ответ должен содержать статус код 303', async () => {
      const response = await request.post('/user/login').send({
        login: 'usertwo@gmail.com',
        userPassword: 'usertwo',
      })
      expect(response.statusCode).toBe(303)
    })
  })

  describe('пароль или логин отсутствуют', () => {
    test('ответ должен содержать статус код 500', async () => {
      const response = await request.post('/user/login').send({
        login: 'usertwo@gmail.com',
      })
      expect(response.statusCode).toBe(500)
    })
  })
})

// Тест метода получения контактов пользователя
describe('POST /contacts/get', () => {
  afterAll(() => {
    stop()
  })

  describe('получен UserID', () => {
    test('ответ должен содержать статус код 200', async () => {
      const response = await request.post('/contacts/get').send({
        UserID: '8q6abSkXtkDV8NsKLRrMJM',
      })
      expect(response.statusCode).toBe(200)
    })
  })

  describe('UserID отстутствует', () => {
    test('ответ должен содержать статус код 500', async () => {
      const response = await request.post('/contacts/get').send({
        UserID: undefined,
      })
      expect(response.statusCode).toBe(500)
    })
  })
})
