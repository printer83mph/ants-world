import { RequestHandler } from 'express'

const requireAuth =
  (requireLoginState: boolean): RequestHandler =>
  (req, res, next) => {
    console.log(req.session.username)
    if (requireLoginState === !req.session.username) {
      res.status(401)
      return next(
        new Error(`Must be logged ${requireLoginState ? 'in' : 'out'}.`)
      )
    }
    return next()
  }

export default requireAuth
