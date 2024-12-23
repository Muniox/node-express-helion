import { getFortune } from './fortune'
import { Request, Response, RequestHandler, ErrorRequestHandler } from 'express'
import multiparty from 'multiparty'

const VALID_EMAIL_REGEX = new RegExp('^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@' +
  '[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?' +
  '(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$')

// fałszywy interfejs "rejestracji w newsletterze"
class NewsletterSignup {
  name: string
  email: string
  constructor({ name, email }: {name: string, email: string}) {
    this.name = name
    this.email = email
  }
  async save() {
    // here's where we would do the work of saving to a database
    // since this method is async, it will return a promise, and
    // since we're not throwing any errors, the promise will
    // resolve successfully
  }
}


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
  const name = req.body.name || '', email = req.body.email || ''
  // walidacja danych wejściowych
  if(!VALID_EMAIL_REGEX.test(email)) {
    req.session.flash = {
      type: 'danger',
      intro: 'Validation error!',
      message: 'The email address you entered was not valid.',
    }
    return res.redirect(303, '/newsletter-signup')
  }
  // NewsletterSignup jest przykładowym obiektem jaki można utworzyć; ponieważ
  // każda implementacja może być różna, to do nas należy definicja tych
  // interfejsów specyficznych dla projektu. Ten przykład pokazuje jedynie jak może
  // wyglądać typowa implementacja Express w naszym projekcie
  new NewsletterSignup({ name, email }).save()
    .then(() => {
      req.session.flash = {
        type: 'success',
        intro: 'Thank you!',
        message: 'You have now been signed up for the newsletter.',
      }
      return res.redirect(303, '/newsletter-archive')
    })
    .catch(err => {
      req.session.flash = {
        type: 'danger',
        intro: 'Database error!',
        message: 'There was a database error; please try again later.',
      }
      return res.redirect(303, '/newsletter-archive')
    })
}

export const newsletterSignupThankYou = (req: Request, res: Response) => {
  res.render('newsletter-signup-thank-you')
}

export const newsletterArchive = (req: Request, res: Response) => res.render('newsletter-archive')

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


