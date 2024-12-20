import { getFortune } from './fortune'
import { Request, Response, RequestHandler, ErrorRequestHandler } from 'express'

export const home = (req: Request, res: Response) => {
  res.render('home')
}

export const about = (req: Request, res: Response) => {
  res.render('about', { fortune: getFortune() })
}

export const notFound: RequestHandler = (req, res, next) => {
  res.status(404)
  res.render('404')
}

 export const serverError: ErrorRequestHandler = (err, req: Request, res: Response, next) => {
  res.status(500)
  res.render('500')
}

export const newsletterSignup = (req: Request, res: Response) => {
  res.render('newsletter-signup', {csrf: 'miejsce na token CSRF'})
}

export const newsletterSignupProcess = (req: Request, res: Response) => {
  console.log('Formularz (z ciągu zapytania): ' + req.query.form)
  console.log('Token CSRF (z ukrytego pola formularza): ' + req.body._csrf)
  console.log('Imię (z widocznego pola formularza): ' + req.body.name)
  console.log('E-mail (z widocznego pola formularza): ' + req.body.email)
  res.status(303)
  res.redirect('/newsletter-signup/thank-you')
}

export const newsletterSignupThankYou = (req: Request, res: Response) => {
  res.render('newsletter-signup-thank-you')
}


