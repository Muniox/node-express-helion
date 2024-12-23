import { RequestHandler } from "express";

declare module 'express-session' {
  interface SessionData {
    flash: { [key: string]: any }
  }
}

export const flash: RequestHandler = (req, res, next) => {
  res.locals.flash = req.session.flash
  delete req.session.flash
  next()
}

