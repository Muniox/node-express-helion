import { home, about, notFound, serverError } from '../handlers'
import { jest, test, expect } from "@jest/globals";

test('strona domowa się renderuje', () => {
    const req = {} as any
    const res = { render: jest.fn() } as any
    home(req, res)
    expect(res.render.mock.calls[0][0]).toBe('home')
})
