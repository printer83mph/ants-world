import express from 'express'
import requireAuth from '../middlewares/requireAuth'
import User from '../models/user'

const AuthRouter = express.Router()

AuthRouter.post('/login', requireAuth(false), async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (user === null) {
      // user does not exist
      res.status(401)
      throw new Error('Incorrect username or password.')
    }
    if (user.password !== password) {
      // incorrect password
      res.status(401)
      throw new Error('Incorrect password.')
    }
    // correct user
    req.session.username = username
    res.status(200).json({ message: 'Successfully logged in.' })
  } catch (err) {
    return next(err)
  }
})

AuthRouter.post('/logout', requireAuth(true), (req, res) => {
  req.session.username = null
  res.status(200).json({ message: 'Successfully logged out.' })
})

AuthRouter.post('/signup', requireAuth(false), async (req, res, next) => {
  try {
    const { username, password } = req.body
    if (await User.exists({ username })) {
      res.status(400)
      throw new Error('Username already exists!')
    }
    const user = new User({ username, password, ants: [] })
    await user.save()
    res.status(200).json({ message: 'Successfully created account.' })
  } catch (err) {
    return next(err)
  }
})

AuthRouter.get('/me', async (req, res, next) => {
  try {
    const { username } = req.session
    if (!username) {
      return res.status(200).json({ loggedIn: false })
    }
    const user = await User.findOne({ username })
    res.status(200).json({ loggedIn: true, username: user.username })
  } catch (err) {
    return next(err)
  }
})

export default AuthRouter
