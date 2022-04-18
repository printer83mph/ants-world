import express from 'express'
import requireAuth from '../middlewares/requireAuth'
import User from '../models/user'

const CollectionRouter = express.Router()

// get ants collection
CollectionRouter.get('/', requireAuth(true), async (req, res, next) => {
  try {
    // @ts-ignore
    const { user } = req.session
    const userDoc = await User.findOne({ username: user })

    res.status(200).json({ ants: userDoc.ants })
  } catch (err) {
    return next(err)
  }
})

// get someone else's ants collection
CollectionRouter.get('/view', async (req, res, next) => {
  try {
    const { username } = req.body
    const userDoc = await User.findOne({ username })

    res.status(200).json({ ants: userDoc.ants })
  } catch (err) {
    return next(err)
  }
})

// adds an ant, sends back ants as well
CollectionRouter.post('/add', requireAuth(true), async (req, res, next) => {
  try {
    // @ts-ignore
    const { user } = req.session
    const { id } = req.body
    const userDoc = await User.findOne({ username: user })
    if (userDoc.ants.includes(id)) {
      res.status(400)
      return new Error('Ant already in collection.')
    }

    userDoc.ants.push(id)
    await userDoc.save()

    res.status(200).json({ ants: userDoc.ants })
  } catch (err) {
    return next(err)
  }
})

// remove an ant from our collection. sends collection back
CollectionRouter.post('/remove', requireAuth(true), async (req, res, next) => {
  try {
    // @ts-ignore
    const { user } = req.session
    const { id } = req.body
    const userDoc = await User.findOne({ username: user })
    if (!userDoc.ants.includes(id)) {
      res.status(400)
      return new Error('Ant does not exists.')
    }

    userDoc.ants.remove(id)
    await userDoc.save()

    res.status(200).json({ ants: userDoc.ants })
  } catch (err) {
    return next(err)
  }
})
