import express from 'express'
import requireAuth from '../middlewares/requireAuth'
import AntSim from '../models/ant-sim'
import User from '../models/user'

const CollectionRouter = express.Router()

// get ants collection
CollectionRouter.get('/', requireAuth(true), async (req, res, next) => {
  try {
    // @ts-ignore
    const { username } = req.session
    const userDoc = await User.findOne({ username })

    res.status(200).json({ ants: userDoc.ants })
  } catch (err) {
    return next(err)
  }
})

// get someone else's ants collection
CollectionRouter.get('/:user', async (req, res, next) => {
  // TODO: this
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
    const { username } = req.session
    const { antId } = req.body
    const userDoc = await User.findOne({ username })
    if (userDoc.ants.includes(antId)) {
      res.status(400)
      return new Error('Ant already in collection.')
    }

    // mark for saving after death
    AntSim.touch(antId)

    userDoc.ants.push(antId)
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
    const { username } = req.session
    const { antId } = req.body
    const userDoc = await User.findOne({ username })
    if (!userDoc.ants.includes(antId)) {
      res.status(400)
      return new Error('Ant not found.')
    }

    userDoc.ants.remove(antId)
    await userDoc.save()

    res.status(200).json({ ants: userDoc.ants })
  } catch (err) {
    return next(err)
  }
})

export default CollectionRouter
