import { home, about, notFound, serverError } from '../handlers'
import { jest, test, expect } from "@jest/globals"

test('strona domowa się renderuje', () => {
    const req = {} as any
    const res = { render: jest.fn() } as any
    home(req, res)
    expect(res.render.mock.calls[0][0]).toBe('home')
})

test('strona I nas renderuje się z ciasteczkiem szczęścia', () => {
  const req = {} as any
  const res = { render: jest.fn() } as any
  about(req, res)
  expect(res.render.mock.calls.length).toBe(1)
  expect(res.render.mock.calls[0][0]).toBe('about')
  expect(res.render.mock.calls[0][1]).toEqual(expect.objectContaining({fortune: expect.stringMatching(/\W/)}))
})

test('funkcja obsługi błędu 404 się renderuje', () => {
  const req = {} as any
  const res = {
    status: jest.fn(),
    render: jest.fn()
  } as any
  const next = jest.fn() as any
  notFound(req, res, next)
  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.render.mock.calls.length).toBe(1)
  expect(res.render.mock.calls[0][0]).toBe('404')
})

test('funkcja obsługi błędu 500 się renderuje', () => {
  const err = new Error('jakiś błąd')
  const req = {} as any
  const res = {
    status: jest.fn(),
    render: jest.fn()
  } as any
  const next = jest.fn() as any
  serverError(err, req, res, next)
  expect(res.render.mock.calls.length).toBe(1)
  expect(res.render.mock.calls[0][0]).toBe('500')
})


