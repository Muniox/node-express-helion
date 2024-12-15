import { getFortune } from './fortune'
import { Request, Response, RequestHandler, ErrorRequestHandler } from 'express'

export const home = (req: Request, res: Response) => {
  res.render('home')
}

export const about = (req: Request, res: Response) => {
  res.render('about', { fortune: getFortune() })
}

export const notFound: RequestHandler = (req, res) => {
  res.status(404).render('404')
}

 export const serverError: ErrorRequestHandler = (err, req: Request, res: Response, next) => {
  res.status(500).render('500')
}


