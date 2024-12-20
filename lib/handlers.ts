import { getFortune } from './fortune'
import { Request, Response, RequestHandler, ErrorRequestHandler } from 'express'
import multiparty from 'multiparty'

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

export const newsletter = (req: Request, res: Response) => {
  res.render('newsletter', {csrf: 'miejsce na token CSRF'})
}


// Contest vacation photo
export const vacationPhoto = (req: Request, res: Response) => {
  res.render('contest/vacation-photo', {csrf: 'miejsce na token CSRF', year: 2024, month: 4})
}

export const vacationPhotoAjax = (req: Request, res: Response) => {
  res.render('contest/vacation-photo-ajax', {csrf: 'miejsce na token CSRF', year: 2024, month: 4})
}

export const vacationPhotoContestProcess = (req: Request, res: Response, fields: Record<string, string[] | undefined>, files: Record<string, multiparty.File[] | undefined>) => {
  console.log('params: ', 'year: ' + req.params.year, 'month: ' + req.params.month)
  console.log('field data: ', fields)
  console.log('files: ', files)
  res.status(303)
  res.redirect('/contest/vacation-photo-thank-you')
}

export const vacationPhotoThankYou = (req: Request, res: Response) => {
  res.render('contest/vacation-photo-thank-you')
}

export const api = {
  newsletterSignup: (req: Request, res: Response) => {
    console.log('Token CSRF (z ukrytego pola formularza): ' + req.body._csrf)
    console.log('Imię (z widocznego pola formularza): ' + req.body.name)
    console.log('E-mail (z widocznego pola formularza): ' + req.body.email)
    res.send({result: 'success'})
  },

  vacationPhotoContest: (req: Request, res: Response, fields: any, files: any) => {
    console.log('field data: ', fields)
    console.log('files: ', files)
    res.send({result: 'success'})
  }
}


